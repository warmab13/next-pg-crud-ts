import { Button, Menu } from "semantic-ui-react";
import { Container, Image } from "semantic-ui-react";
import { useRouter } from "next/router";

export default function Navbar() {
    const router = useRouter();

  return (
    <Menu inverted attached style={{padding: '1.5rem'}}>
        <Container>
            <Menu.Item onClick={()=> router.push('/')}>
                <Image src="https://react.semantic-ui.com/logo.png" alt="logo" size="mini" 
                width={30} height={3}
                />
            </Menu.Item>
            
            <Menu.Menu position="right">
                <Menu.Item>
                    <Button onClick={()=> router.push('/tasks/new')}>
                        New Task
                    </Button>
                </Menu.Item>
            </Menu.Menu>
        </Container>
    </Menu>
  )
}
