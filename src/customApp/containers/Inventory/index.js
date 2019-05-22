import React, { Component } from "react";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper.js";
import LayoutContent from "../../../components/utility/layoutContent";
import axios from "axios/index";
import TableView from '../Tables/antTables/index';

export default class extends Component {
    constructor(){
        super()
    }

    componentWillMount(){
        // axios.get('https://dev.guardsight.no:8443/api/user/details')
        //     .then(function (response) {
        //         console.log(response);
        //     }).catch(() => {
        //     debugger;
        //     this.setState({ isError: true });
        // });
        const url = 'https://dev.guardsight.no:8443/api/user/details';
        fetch(url)
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(data) {
                // Create and append the li's to the ul
            })

        console.log(localStorage.getItem("token"));
    }

    render() {
        return (
            <LayoutContentWrapper style={{ height: "100vh" }}>
                <LayoutContent>
                <TableView/>
                </LayoutContent>
            </LayoutContentWrapper>
        );
    }
}