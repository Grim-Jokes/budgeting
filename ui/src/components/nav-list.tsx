import * as React from 'react';
import { List, ListItem, ListItemIcon } from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/Receipt';
import StorefrontIcon from '@material-ui/icons/Storefront';

export function NavList() {
    return (
        <div className="nav">
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <ReceiptIcon />
                    </ListItemIcon>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <StorefrontIcon />
                    </ListItemIcon>
                </ListItem>
            </List>
        </div>);
}