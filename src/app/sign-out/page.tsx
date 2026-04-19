import signOutAction from '@/app/actions/commands/sign-out';

export default async function SignOut () {
    await signOutAction();
}
