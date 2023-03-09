import { Task } from '../interfaces/Tasks';
import { Grid, Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import TaskList from '../components/tasks/TaskList';
import Layout from '../components/Layout'
interface Props {
  tasks: Task[]
}

export default function index( { tasks } : Props){
  console.log("🚀 ~ file: index.tsx:7 ~ index ~ tasks:", tasks)

  const router = useRouter();

  return <Layout>{ tasks.length === 0 ? 
        <Grid
          columns={3}
          centered
          verticalAlign='middle'
          style={{ height : "70%" }}>
          <Grid.Row>
            <Grid.Column>
              <h1>No tasks yet</h1>
              <Button onClick={() => router.push('/tasks/new')}>Create a new task</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
       : (
        <TaskList tasks={tasks} />
      )}</Layout>
}

export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3000/api/tasks");
  const tasks = await response.json();
  console.log("🚀 ~ file: index.tsx:13 ~ getServerSideProps ~ tasks:", tasks)
  return {
    props:{
      tasks: tasks.result
    }
  }
}