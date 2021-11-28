import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, 
    Button, Modal, ModalHeader, ModalBody, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';

class CommentForm extends Component{
    
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            // rating: '1',
            // author: '',
            // text: ''
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(value) {
        console.log("Current state is: " + JSON.stringify(value));
        alert("Current state is: " + JSON.stringify(value));
        this.toggleModal();
    }

    render(){
        return(
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                <i className="fa fa-pencil fa-lg" /> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select 
                                    model=".rating" 
                                    value={this.state.rating}
                                    onChange={this.handleInputChange}
                                    name="rating" 
                                    id="rating"
                                    className="form-control">
                                        <option>1</option>                                    
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text 
                                    model=".author" 
                                    placeholder="Your Name"
                                    value={this.state.author}
                                    onChange={this.handleInputChange}
                                    id="author" 
                                    name="author"  
                                    className="form-control" 
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="text">Comments</Label>
                                <Control.textarea 
                                    model=".text" 
                                    value={this.state.text}
                                    onChange={this.handleInputChange}
                                    id="text" 
                                    name="text"
                                    className="form-control"
                                    rows="6"
                                />
                            </div>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment> 
        )
    }
}

function RenderCampsite({campsite}){
    return(
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src = { campsite.image } alt = { campsite.name } />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments}){
    if (comments){
        return(
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comments => {
                    return(
                        <div key={comments.id}>
                            <p>{'-- ' + comments.text}<br />
                                {comments.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</p>
                        </div>
                    );
                })}
                <CommentForm />

            </div>
        );
    } return
        <div />        
}

function CampsiteInfo ({campsites, comments}) {
    if (campsites){
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{campsites.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{campsites.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={campsites} />
                    <RenderComments comments={comments} />
                    
                </div>
            </div>
        );
    } 
    return <div />;
}

export default CampsiteInfo;