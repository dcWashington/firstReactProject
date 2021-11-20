import React from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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