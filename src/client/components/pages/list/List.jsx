import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setDeploymentData, setIsAdding } from '../../../actions/index';
import Button from '../../common/Button/Button';
import { Api } from '../../../config';
import './list.scss';

const List = (props) => {

    const [addingWidth, setAddingWidth] = useState(0);

    const onDelete = (id) => {
        Api.post('api/delete-deployment', { id: id }).then((response) => {
            props.setDeploymentData({ results: response.data.result })
        })
    }

    const redirectToForm = () => {
        props.history.push('/add-deployment');
    }

    const showUpload = () => {
        let timeInterval = Math.floor(Math.random() * 10) + 1;
        let progress = Math.ceil(100 / timeInterval);
        let oldValue = 0;

        let uploadProgress = setInterval(() => {
            setAddingWidth(oldValue);
            oldValue = oldValue + progress;
            if (oldValue > 100) {
                clearInterval(uploadProgress);
                props.setIsAdding({ isAdding: false });
            }
        }, 1000)
    }

    useEffect(() => {
        Api.get('api/get-deployment').then((result) => {
            props.setDeploymentData({ results: result.data.result })
        })
    }, [])

    useEffect(() => {
        if (props.isAdding) {
            setAddingWidth(0);
            showUpload();
        }
    }, [props.isAdding])

    return (
        <div className='list-container'>
            <h3>All Deployments</h3>
            {props.deployments.length ? <><div className={`list-holder ${props.isAdding ? 'is-adding' : ''}`}>
                <div className='heading'>
                    <div className='width-8'>Index</div>
                    <div className='width-42'>URL</div>
                    <div className='width-15'>Template</div>
                    <div className='width-10'>Version</div>
                    <div className='width-15'>Date</div>
                    <div className='width-10'></div>
                </div>
                {props.deployments.map((cur, index) => {
                    return <div className='each-item' key={index}>
                        <div className='width-8'>{index}</div>
                        <div className='width-42'>{cur.url}</div>
                        <div className='width-15'>{cur.template}</div>
                        <div className='width-10'>{cur.version}</div>
                        <div className='width-15'>{cur.date}</div>
                        <div className='width-10 link-text' onClick={() => onDelete(cur._id)}>Delete</div>
                    </div>
                })}
            </div>
                {props.isAdding ? <div className='adding-field'><div className='adding-deployment' style={{ width: addingWidth + '%' }}></div></div> : null}
            </> : <div className='no-result'>
                    <h4>No Deployments Found! Click Below to Add</h4>
                </div>}
            <div className='footer-btn-holder'>
                <Button label='Add Deployment' variant='secondary' onClick={redirectToForm} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        deployments: state.deployment.results,
        isAdding: state.deployment.isAdding
    };
};

export default connect(mapStateToProps, {
    setIsAdding,
    setDeploymentData
})(List);