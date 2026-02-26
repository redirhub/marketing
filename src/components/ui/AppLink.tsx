import NextLink from 'next/link';
import { Link, LinkProps } from '@chakra-ui/react';

interface AppLinkProps extends LinkProps {
    href?: string;
    disabled?: boolean;
}

export function AppLink({ href, disabled, ...props }: AppLinkProps) {
    return (
        <Link as={disabled ? 'button' : NextLink} href={disabled ? undefined : (href || 'javascript: void(0);')} {...props} />
    );
}
