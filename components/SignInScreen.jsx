import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { signIn } from 'next-auth/react';


export default function SignInScreen() {
  return (
    <>
        <Stack direction='row' className='bg-[#343541] w-screen h-screen'>
            <Button onClick={() => signIn()} className='top-0 left-0 right-0 bottom-0 m-auto' variant='outlined'>Sign in with Google</Button>
        </Stack>
    </>
  )
}