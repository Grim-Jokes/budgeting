import * as React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/Receipt';
import StorefrontIcon from '@material-ui/icons/Storefront';
import DashboardSharpIcon from '@material-ui/icons/DashboardSharp';
import CategoryIcon from '@material-ui/icons/Category';

interface LinkProps {
    href: string;
    children: any;
}

function ListItemLink(props: LinkProps) {
    return <ListItem button component="a" {...props} />;
}

export function NavList() {
    return (
        <Drawer variant="persistent" className="nav" anchor="left" open={true} >
            <List>
                <ListItem>
                    <ListItemLink href="/dashboard">
                        <ListItemIcon>
                            <DashboardSharpIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Dashboard"} />
                    </ListItemLink>
                </ListItem>
                <ListItem>
                    <ListItemLink href="/transactions">
                        <ListItemIcon>
                            <ReceiptIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Transactions"} />
                    </ListItemLink>
                </ListItem>
                <ListItem>
                    <ListItemLink href="/merchants">
                        <ListItemIcon>
                            <StorefrontIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Merchants"} />
                    </ListItemLink>
                </ListItem>
                <ListItem>
                    <ListItemLink href="/categories">
                        <ListItemIcon>
                            <CategoryIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Categories"} />
                    </ListItemLink>
                </ListItem>
            </List>
        </Drawer>
    );
}