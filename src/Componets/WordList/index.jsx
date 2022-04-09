import React from "react"
import { Box, Typography, createStyles } from "@material-ui/core"
const classes = createStyles({
    highLight: {
        backgroundColor: "#d5d1ca"
    }
})
const WordList = ({ lines, currentIndex }) => {

    return (
        <Box style={{
            width: '100%',
            minHeight: 150,
            borderColor: '#800080',
            border: '4px solid #800080',
            backgroundColor: 'rgba(214, 153, 255, 0.2)'
            //borderWidth:4,
        }}>
            {lines.map((item_1, index_1) =>
                <Typography key={index_1} id="text" style={{ textAlign: 'justify', paddingLeft: 30, paddingRight: 30, marginTop: 10 }}>
                    {item_1.map((item, index) => {
                        if (index === currentIndex[1] && index_1 === currentIndex[0]) {

                            return <span key={item} style={classes.highLight}>{item + ' '}</span>
                        }
                        return item + ' '
                    })}
                </Typography>)}
        </Box>
    )
}

export default React.memo(WordList);