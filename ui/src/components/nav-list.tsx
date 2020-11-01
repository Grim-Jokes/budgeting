import * as React from 'react';
import { List, ListItem, ListItemIcon } from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/Receipt';
import StorefrontIcon from '@material-ui/icons/Storefront';

interface LinkProps {
    href: string;
    children: any;
}

function ListItemLink(props: LinkProps) {
    return <ListItem button component="a" {...props} />;
  }

export function NavList() {
    return (
        <div className="nav">
            <List>
                <ListItemLink href="/transactions">
                    <ListItemIcon>
                        <ReceiptIcon />
                    </ListItemIcon>
                </ListItemLink>
                <ListItemLink href="/merchants">
                    <ListItemIcon>
                        <StorefrontIcon />
                    </ListItemIcon>
                </ListItemLink>
            </List>
        </div>);
}