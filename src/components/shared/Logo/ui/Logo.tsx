import logo from './logo.svg';
import Image from 'next/image';

export const Logo = () => {
    return (
        <Image src={logo} width={120} height={30} alt="Logo Lingobot" />
    )
}