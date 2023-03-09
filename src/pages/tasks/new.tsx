import { Card, Form, Button, Icon, Grid, Confirm } from "semantic-ui-react";
import { ChangeEvent, useState, FormEvent, useEffect } from "react";
import { Task } from '../../interfaces/Tasks';
import { useRouter } from "next/router";
import Layout from '../../components/Layout';

export default function newPage() {

    const [task, setTask ] = useState({
        title: '',
        description: ''
    })

    const [openConfirm, setOpenConfirm] = useState(false);

    const router = useRouter();

    const handleChange = ({ target:{ name, value }}:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTask({ ...task, [name]: value })

    const createTask = async (task: Task) => {
        await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
    }

    const updateTask = async (id: string, task: Task) => {
        console.log("🚀 ~ file: new.tsx:29 ~ updateTask ~ task:", task)
        console.log("🚀 ~ file: new.tsx:29 ~ updateTask ~ id:", id)
        let url = `http://localhost:3000/api/tasks/${id}`;
        console.log("🚀 ~ file: new.tsx:33 ~ updateTask ~ url:", url)
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if(typeof router.query.id === 'string'){
                updateTask(router.query.id as string, task);
            }else{
                await createTask(task);  
            }
            router.push("/");
        } catch (error) {
            console.log(error);
        } 
    }

    const loadTask = async (id: string) => {
        const res = await fetch(`http://localhost:3000/api/tasks/${id}`);
        const task = await res.json();
        console.log("🚀 ~ file: new.tsx:41 ~ loadTask ~ task:", task)
        const { title, description } = task.result;
        setTask({title: title, description: description});
    }

    const handleDelete = async (id: string) => {
        console.log("🚀 ~ file: new.tsx:68 ~ handleDelete ~ id:", id)
        const url = `http://localhost:3000/api/tasks/${id}`
        try {
            const res = await fetch(url, {
                method: 'DELETE'
            })
            const data = await res.json();
            console.log("🚀 ~ file: new.tsx:75 ~ handleDelete ~ data:", data)
            router.push("/")
        } catch (error) {
            console.log("🚀 ~ file: new.tsx:74 ~ handleDelete ~ error:", error);
        }
    }

    useEffect( ()=> {
        if(typeof router.query.id === 'string') loadTask(router.query.id);
    }, [router.query])

  return (
    <Layout>
        <Grid centered columns={3} verticalAlign="middle" style={{height: "70%"}}>
            <Grid.Column>
                <Card>
                    <Card.Content>
                        <Form onSubmit={handleSubmit}>
                            <Form.Field>
                                <label htmlFor="title">Title:</label>
                                <input type="text" placeholder="Write your title" name="title" onChange={handleChange} value={task.title}/>
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="description">Description:</label>
                                <textarea placeholder="Write your description" name="description" rows={2} onChange={handleChange} value={task.description}/>
                            </Form.Field>
                            {
                                router.query.id ? (
                                    <Button color="teal">
                                        <Icon name="save" />
                                            Update
                                    </Button>
                                ):(
                                    <Button primary>
                                        <Icon name="save" />
                                            Save
                                    </Button>
                                )
                            }
                        </Form>
                    </Card.Content>
                </Card>

                <Button color="red" onClick={() => setOpenConfirm(true)}>
                    Delete
                </Button>
            </Grid.Column>
        </Grid>
        <Confirm 
            header="Delete Task"
            content={`Are you sure you want to delete this task ${router.query.id} ?`}
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => typeof router.query.id === "string" && handleDelete(router.query.id)}
        />
    </Layout>
  )
}
