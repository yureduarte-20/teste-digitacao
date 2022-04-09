import React, { Component } from 'react'
import { Box, createStyles, Typography } from "@material-ui/core"
const classes = createStyles({
    timer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        borderRadius: 3,
        backgroundColor: '#c6c2f1',
        marginRight: 20,
        marginLeft: 20
    },
    textTime: {
        paddingLeft: 10,
        paddingRight: 10
    }
})
class Timer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 100
        }
        this.onOver = this.props.onOver.bind(this)
    }

    render() {
        const { count } = this.state
        return (
            <Box style={classes.timer}>
                <Typography variant="h6" component="caption" style={classes.textTime}>{count >= 60 ? `1:00` : (count < 10 ? `0:0${count}` : `0:${count}`)}</Typography>
            </Box>
        )
    }
    // setInterval
    // clearInterval
    componentDidMount() {
        const { startCount } = this.props
        this.setState({
            count: startCount
        })
        this.doIntervalChange()
    }
    doIntervalChange = () => {
        this.myInterval = setInterval(() => {
            if (this.state.count <= 0) {
                this.setState((prevState, props) => ({
                    count: props.startCount
                }))
                this.onOver()
            } else {

                this.setState(prevState => ({
                    count: prevState.count - 1
                }))
            }
        }, 1000)

    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }
}

export default Timer