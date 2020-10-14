import Axios from 'axios';
import React from 'react'
import {withRouter} from 'react-router-dom'
import {getToken, clearToken} from '../helpers/jwt'
import axios from 'axios'

class Authenticated extends React.Component{
    //
    constructor(props){
        super(props)
        this.state={ authenticated: false};
    }
    componentDidMount(){
        const access = getToken()
        if(!access){
            this.props.history.push('/login')
        }
        axios.get('/me',{
            headers:{Authorization:`Bearer ${access}`}
        }).then(res=>{
            const status = res.status;
            if(status===200 || status===204 || status===304){
                this.props.history.push('/lists')
            }
        }).catch(err=>{
            console.log(err)
            clearToken();
            this.props.history.push('/login')
        })
    }

    render(){
        return <div>loading...</div>
    }

}