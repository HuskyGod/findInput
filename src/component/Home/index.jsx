import React, { Component } from 'react'
import { Select, Divider, Icon, Button, Badge } from 'antd';

import {http} from '../../util/http.js'
import * as API from '../../const/api.js'

const { Option } = Select;
export default class Home extends Component {
    state = {
        findArr: [],
        project: [],
        find: '',
        dowm: false
    }

    render() {
        const {project, dowm, findArr} = this.state;
        const option = project.map(item => (
            <Option key={item.id}>
                {
                    dowm ?
                    <div style={{display: 'flex', padding: '0px 10px'}}>
                        <div style={{marginRight: 10}}><Icon type={item.type} /></div>
                        <div>{item.title || item.name}</div>
                    </div> : item.title || item.name
                }
            </Option>
        ))
        return (
            <div style={{maxWidth: 900, margin: '0px auto', width: '100%'}}>
                <div style={{display: 'flex', justifyContent: 'center' , alignItems: 'center', padding: 30, paddingTop: 100}}>
                    <div style={{flex: 1}}>
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            notFoundContent={null}
                            onSearch={this.handleSearch}
                            onChange={this.handleChange}
                            onDropdownVisibleChange={this.onDropdownVisibleChange}
                        >
                            {option}
                        </Select>
                    </div>
                    <div style={{margin: "0px 20px"}}><Button onClick={this.find} type="primary" shape="circle" icon="search" /></div>
                </div>
                <Divider />
                <div >
                    {
                        findArr.map((item, index) => {
                            if (item.type === "project") {
                                return this.renderProject(item)
                            }
                            return (
                                <div key={index}>
                                    <div>author: {item.name}</div>
                                    <Divider />
                                    <div style={{paddingLeft: 30}}>
                                        {
                                            item.project.map(project => {
                                                return this.renderProject(project)
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    renderProject(item) {
        return (
            <div key={item.id}>
                <div style={{display: 'flex', cursor: 'pointer'}}>
                    <Icon style={{marginRight: 20, paddingTop: 20}} type="project" />
                    <div>
                        <span style={{ color: "rgb(12, 75, 224)" }}>{item.title}</span>
                        <div>{item.docs}</div>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingTop: 20}}>
                    <div><span style={{width: '80px', textAlign: 'center', display: 'block', lineHeight: '15px', 
                        border: '1px solid rgb(162, 162, 162)', background: '#f1f1f1', borderRadius: 10, fontSize: 12}}>{item.language}</span></div>
                    <div style={{display: 'flex', justifyContent: 'center' , alignItems: 'center', margin: '0px 10px'}}>
                        <Icon type="star" style={{marginRight: 3}} />
                        <div>{item.star}</div>
                    </div>
                </div>
                <Divider />
            </div>
        )
    }

    componentDidMount() {
        this.findText("")
    }

    handleSearch = value => {
        this.findText(value)
    };

    onDropdownVisibleChange = open => {
       this.setState({
            dowm: open
       })
    }

    handleChange = value => {
        console.log('value', value)
        this.setState({
            find: value
        })
    };

    find = () => {
        http.get(API.GET_LIST, {
            params: {
                find: this.state.find
            }
        }).then(({data}) => {
            this.setState({
                findArr: data.sort((a) => a.project ? -1 : 0)
            })
        })
    }

    findText(value) {
        http.get(API.GET_FIND_LIST, {
            params: {
                find: value
            }
        })
            .then(({data}) => {
                this.setState(() => {
                    const project = []
                    data.map(arr => {
                        project.push(arr)
                        return arr;
                    })
                    return {
                        project
                    }
                })
                return null;
            })
    }
}
