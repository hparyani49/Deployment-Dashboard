import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setTemplates, setIsAdding } from '../../../actions/index';
import Button from '../../common/Button/Button';
import Dropdown from '../../common/Dropdown/Dropdown';
import { Api } from '../../../config';
import './add-deployment.scss';

const AddDeployment = (props) => {

    const [dataObj, setDataObj] = useState({
        template: '',
        url: '',
        version: '',
        date: ''
    });
    const [errorObj, setErrorObj] = useState({});

    const onChange = (obj) => {
        setDataObj({ ...dataObj, ...obj });
    }

    const isValidUrl = (str) => {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }

    const onSubmit = () => {
        let isError = false;
        let newErrorObj = {};
        Object.keys(dataObj).map((cur, index) => {
            if (dataObj[cur] == '' || (cur == 'url' && !isValidUrl(dataObj[cur]))) {
                isError = true;
                newErrorObj[cur] = true;
            }
        })
        setErrorObj(newErrorObj);

        if (!isError) {
            Api.post('api/add-deployment', dataObj).then((response) => {
                props.setIsAdding({ isAdding: true }).then(() => {
                    redirectToLogin();
                })
            })
        }
    }

    const redirectToLogin = () => {
        props.history.push('/');
    }

    useEffect(() => {
        Api.get('api/get-templates').then((result) => {
            props.setTemplates({ templates: result.data.result })
        })
    }, [])

    return (
        <div className='deployment-container'>
            <h3>Add Deployment</h3>
            <div className='form-holder'>
                <div className={`input-holder ${errorObj.url ? 'error' : ''}`}>
                    <input
                        key='url'
                        placeholder='Enter URL'
                        onChange={(e) => {
                            onChange({ url: e.target.value });
                        }}
                        className='form-control'
                    />
                    {errorObj.url ? <div className='error-text'>Please Enter Valid URL</div> : ''}
                </div>
                <div className={`dropdown-holder ${errorObj.template ? 'error' : ''}`}>
                    <Dropdown
                        label='Template Name'
                        placeholder='Select Template'
                        optionList={props.templates}
                        value={dataObj.templateIndex}
                        onChange={(value, index) => {
                            onChange({ template: value.label, templateIndex: index, version: undefined, versionIndex: undefined });
                        }}
                    />
                    {errorObj.template ? <div className='error-text'>Please Select Template</div> : ''}
                </div>
                <div className={`dropdown-holder ${errorObj.version ? 'error' : ''}`}>
                    <Dropdown
                        label='Version'
                        placeholder='Select Version'
                        optionList={props.templates.length && dataObj.templateIndex != undefined ? props.templates[dataObj.templateIndex].versions : []}
                        value={dataObj.versionIndex}
                        onChange={(value, index) => {
                            onChange({ version: value, versionIndex: index });
                        }}
                    />
                    {errorObj.version ? <div className='error-text'>Please Select Version</div> : ''}
                </div>
                <div className={`input-holder ${errorObj.date ? 'error' : ''}`}>
                    <input
                        type='date'
                        onChange={(e) => {
                            onChange({ date: e.target.value });
                        }}
                        className='form-control'
                    />
                    {errorObj.date ? <div className='error-text'>Please Select Date</div> : ''}
                </div>
            </div>
            <div className='footer-btn-holder'>
                <Button label='Submit' onClick={onSubmit} />
                <div className='small-text' onClick={redirectToLogin}>Show All</div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        templates: state.deployment.templates
    };
};

export default connect(mapStateToProps, {
    setIsAdding,
    setTemplates
})(AddDeployment);