import * as React from 'react';
import TableRow from './TableRow';
import Persons from '../models/persons';
import BaseService from '../service/base.service';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

interface IProps {
}
interface IState {
    listPersons: Array<Persons>
    listResult: Array<Persons>
    inputValue: string
}

class Index extends React.Component<IProps, IState> {

    public props: IProps = {
    };

    public state: IState = {
        listPersons: new Array<Persons>(),
        listResult: new Array<Persons>(),
        inputValue:''
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            listPersons: [],
            listResult: [],
            inputValue:''
        };
    }

    handleInputChange(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            inputValue: e.target.value,
        })
    }

    handleBtnClick(){
        BaseService.search<Persons>(`/getUserByNameLike/${this.state.inputValue}`).then(
            (rp) => {
                if (rp.Status) {
                    this.setState({ listResult: rp.Data });
                } else {
                    console.log("Messages: " + rp.Messages);
                    console.log("Exception: " + rp.Exception);
                }
            }

        );
    }

    public componentDidMount() {
        BaseService.getAll<Persons>("/getAllUser").then(
            (rp) => {
                if (rp.Status) {
                    this.setState({ listPersons: rp.Data });
                } else {
                    console.log("Messages: " + rp.Messages);
                    console.log("Exception: " + rp.Exception);
                }
            }
        );
    }

    public tabRow = () => {
        return this.state.listPersons.map(function (object, i) {
            return <TableRow persons={object} />;
        });
    }

    public searchRow = () => {
        return this.state.listResult.map(function (object, i) {
            return <TableRow persons={object} />;
        });
    }

    public render(): React.ReactNode {
        return (
            <div>
                <div>
                    <input
                        id="insertArea"
                        className='Search By Name'
                        value={this.state.inputValue}
                        onChange={this.handleInputChange.bind(this)}
                    />
                    <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={this.handleBtnClick.bind(this)}>
                        Search
                    </Button>
                    <h3 className="text-center">Search Result</h3>
                    <table className="table table-striped" style={{ marginTop: 20 }}>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>password</th>
                            <th>email</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.searchRow()}
                        </tbody>
                    </table>
                </div>
                <h3 className="text-center">Complete User List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>password</th>
                        <th>email</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.tabRow()}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Index;