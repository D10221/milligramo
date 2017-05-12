import * as React from "react";
import { observer } from "mobx-react";

// Elements
import {
    Container,
    Title1,
} from "../elements";

import {
    Nav,
    NavTitle,
    NavigationList,
} from "../elements/navigation";

import { DocMenu } from "./menu-documentation";
import { SupportMenu } from "./menu-support";
import { Octocat } from "./octocat";

import { NavLogo } from "./nav-logo";
import { NavigationItem } from "./navigation-item";
import { AllStores } from "../stores/all-stores";

export const NavMain = observer((props: { stores: AllStores }) => {
    const stores = props.stores;
    const documentationMenuId = "documentation-menu";
    const supportMenuId = "support-menu";
    const store = stores.popovers;
    const isOpen = store.isOpen;
    const toggleOpen = (id: string) => setTimeout(props.stores.popovers.toggleOpen(id), 0);

    return (
        <Nav>
            <Container>
                <NavTitle href="#/home">
                    <NavLogo /> &nbsp;
                    <Title1>Milligram</Title1>
                </NavTitle>
                <NavigationList>
                    <NavigationItem
                        id={documentationMenuId}
                        title="Docs"
                        isOpen={isOpen}
                        toggleOpen={toggleOpen}
                        child={DocMenu}
                    />
                    <NavigationItem
                        id={supportMenuId}
                        title="Support"
                        isOpen={isOpen}
                        toggleOpen={toggleOpen}
                        child={SupportMenu} />
                </NavigationList>
                <Octocat />
            </Container>
        </Nav>
    );
}
);