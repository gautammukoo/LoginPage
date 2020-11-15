import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import {
    Typography,
    TextField,
    Card,
    Box,
    CardContent,
    Button,
    Divider
  } from "@material-ui/core";
import axios from 'axios';
import { API_LOGIN_URL, API_BASE_URL, EMAIL_PH_VALIDATION } from "../constants/constant";

const styles = () => ({
    mainContainer : {
        display : "flex",
        alignItems : "center",
        justifyContent : "center",
        position : "fixed",
        top : "50%",
        left : "50%",
        transform : "translate( -50%, -50%)",
        width : "99vw",
        height : "99vh",
        background : "#f1f2f5"
    },
    cardRoot : {
        borderRadius : "10px"
    },
    textFieldBox : {
        margin : "10px 0px",
        '& label.Mui-focused': {
            color: 'green',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#008fb5',
        },
        '& .MuiOutlinedInput-root': {
            '& ::placeholder' : {
                fontWeight : "500"
            },
            '& fieldset': {
                borderColor: 'lightgray',
            },
            '&:hover fieldset': {
                borderColor: 'lightgray',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#008fb5',
            }
        }
    },
    btnText : {
        textTransform : "none",
        fontWeight : "bold"
    },
    btnStyle : {
        background : "#008fb5",
        minHeight : "40px",
        '&:hover': {
            backgroundColor : "#0290b6"
        }
    },
    btnForget : {
        color : "#008fb5",
        margin : "20px 0px",
        cursor : "pointer",
        fontWeight : "600"
    },
    btnStyleCreate : {
        background : "#54b72e",
        minHeight : "40px",
        '&:hover': {
            backgroundColor : "#56b432"
        }
    },
    btnCreateContainer : {
        height : "100px",
        display : "flex",
        justifyContent : "center",
        alignItems : "center"
    }
  });
  
class LoginPageMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mailId : "",
            password : "",
            snackbarContent : {
                open : false,
                message : "",
            },
            retrievePwd : false
        }
        this.fnLogIn = this.fnLogIn.bind(this);
        this.fnForgotPwd = this.fnForgotPwd.bind(this);
    }

    fnLogIn() {
        if(EMAIL_PH_VALIDATION.test(this.state.mailId)) {
            let payload = {
                email : this.state.mailId,
                password : this.state.password
            }
            axios.post(
                API_LOGIN_URL, 
                payload
            )
            .then( res => {
                alert(res.data.message)
            })
            .catch( err => {
                console.log(err)
                alert("Network Error!")
            })
        }
        else {
            alert("Email Address / Phone number is not valid, Please provide a valid Email or phone number!")
        }
    }

    fnForgotPwd() {
        if(EMAIL_PH_VALIDATION.test(this.state.mailId)) {
            axios.put(
                API_BASE_URL + `${this.state.mailId}`
            )
            .then( res => {
                alert(res.data.message)
                this.setState({retrievePwd : false})
            })
            .catch( err => {
                console.log(err)
                alert("Network Error!")
            })
        }
        else {
            alert("Email Address / Phone number is not valid, Please provide a valid Email or phone number!")
        }
    }
        
    render() {
        const { classes } = this.props;
        return (
            <div className = {classes.mainContainer}>
               <Card className = {classes.cardRoot}>
                    <CardContent>
                        <TextField 
                            id="username" 
                            variant="outlined"
                            placeholder = "Email address or phone number" 
                            fullWidth = {true}
                            required = {true}
                            type="email"
                            label = ""
                            className = {classes.textFieldBox}
                            value = {this.state.mailId}
                            onChange={(event) =>
                                {
                                    let mailId = this.state.mailId;
                                    mailId = event.target.value;
                                    this.setState({mailId})
                                }
                            }
                        />
                        {this.state.retrievePwd ?
                        <>
                        <Button 
                            id="login"
                            variant="contained" 
                            color="primary"
                            fullWidth = {true}
                            className = {classes.btnStyle}
                            onClick={this.fnForgotPwd}
                        >
                            <Typography className = {classes.btnText}>
                                Send
                            </Typography>
                        </Button>
                        </>
                        : 
                        <>
                        <TextField 
                            id="password" 
                            variant="outlined"
                            type="password"
                            placeholder = "Password" 
                            fullWidth = {true}
                            required = {true}
                            label = ""
                            className = {classes.textFieldBox}
                            value = {this.state.password}
                            onChange={(event) =>
                                {
                                    let password = this.state.mailId;
                                    password = event.target.value;
                                    this.setState({password})
                                }
                            }
                        />
                        <Button 
                            id="login"
                            variant="contained" 
                            color="primary"
                            fullWidth = {true}
                            className = {classes.btnStyle}
                            onClick={this.fnLogIn}
                        >
                            <Typography className = {classes.btnText}>
                                Log In
                            </Typography>
                        </Button>
                            <Typography className = {classes.btnForget} onClick={() => {this.setState({mailId : "", retrievePwd : true})}}>
                                    Forgotten password?
                            </Typography>
                        </>
                        }
                        <Divider />
                        <Box className = {classes.btnCreateContainer}>
                            <Button 
                                id="create"
                                variant="contained" 
                                color="primary"
                                className = {classes.btnStyleCreate}
                            >
                                <Typography className = {classes.btnText}>
                                    Create New Account
                                </Typography>
                            </Button>
                        </Box>
                    </CardContent>
               </Card>
            </div>
        )
    }
}

export default withStyles(styles)(LoginPageMain);