import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import Stepper from '../Stepper/Stepper'
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles({
    root: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: '48em',
        background: 'rgb(255,255,255, .85)',
        padding: '1em',
    },
    emailHeader: {
        minWidth: '30em',
        border: '1px solid black',
        padding: '1em',
        margin: '1em',
    },
    emailBodyStyle: {
        minHeight: '10em',
        border: '1px solid black',
        padding: '1em',
        background: 'rgb(255,255,255, .4)',
    },
    noAddress: {
        marginTop: '5em'
    },
    right: {
        float: 'right'
    },
    cardActions: {
        all: 'unset',
        width: '48em'
    },
    stepper: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '-3em'
    },
    title: {
        fontSize: 48,
        fontFamily: 'leafy',
        color: 'black'
    },
    bodyText:{
        whiteSpace: 'pre-line'
    }
});

function PreviewLetter({ letter, address, history, emails, dispatch }) {
    const { root, card, emailHeader, emailBodyStyle, right, stepper, title, bodyText } = useStyles();

    const directToConfirmation = () => {
        history.push('/confirmation')
    }

    const directToReps = () => {
        history.push('/selectContacts')
        dispatch({ type: 'DELETE_BODY' })
    }

    const fullEmail = encodeURIComponent(letter.intro + '\n' +  '\n' + letter.body + letter.conclusion)

    return (
        <div className={root}>
            <Card className={card}>
                <Typography variant="h5" component="h2" gutterBottom align="center" className={title}>
                    Preview your Email
                    </Typography>
                <Typography gutterBottom >
                    Preview your letter below to make sure everything looks right. When you are happy with your letter, either hit “send” to email it
                    to your selected local officials, or “print” to create a printable PDF with a form for signatures.
                </Typography>
                <CardContent className={emailHeader}>
                    <Typography gutterBottom align="left">
                        Sender: {address.email}
                       
                        <>
                            Recipient(s): {emails}
                        </>
                        <br />
                        Subject: {letter.subject}
                        <br />
                        Message:
                    </Typography>
                    <div className={emailBodyStyle}>
                        <Typography gutterBottom >
                            {letter.intro}
                        </Typography>
                        <Typography gutterBottom className={bodyText}>
                            <br />
                            {console.log(letter.body)}
                            {letter.body}
                        </Typography>
                        <Typography gutterBottom >
                            <br />
                            {letter.conclusion}
                        </Typography>
                    </div>
                </CardContent>
                <div className={stepper} >
                    <Stepper step={3} />
                </div>
                <section >
                    <IconButton onClick={directToReps} style={{ color: 'black' }}><ArrowBackIcon /></IconButton>
                    <div className={right}>
                        <Button >Print PDF <PictureAsPdfIcon /></Button>
                        <IconButton
                            style={{ color: 'black' }}
                            href={`mailto:${emails}?subject=${letter.subject}&body=${fullEmail}`} target="_blank" onClick={directToConfirmation}
                        ><ArrowForwardIcon /></IconButton>
                    </div>
                </section>
            </Card>
        </div>
    );
}

const mapStoreToProps = (reduxState) => {
    return {
        letter: reduxState.letter,
        address: reduxState.address,
        emails: reduxState.emails,
        zip: reduxState.zip
    };
};
export default connect(mapStoreToProps)(PreviewLetter);
