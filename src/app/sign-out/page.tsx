import signOutAction from '@/actions/commands/sign-out';

export default async function SignOut () {
    await signOutAction();
}
