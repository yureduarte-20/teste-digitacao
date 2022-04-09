import React, { useMemo } from 'react'
import { Grid, Typography, TextField, Box } from "@material-ui/core"

import words from '../../utils/words.json'
import WordList from '../../Componets/WordList'
import Timer from '../../Componets/Timer'


const Dashboard = () => {
    const suffled_array_words = words.sort(() => Math.random() - 0.5)
    const [currentTypedWord, setCurrentTypedWord] = React.useState('')
    const [currentIndex, setCurrentIndex] = React.useState([0, 0])
    const [final, setFinal] = React.useState(10)
    const inputRef = React.useRef(null)
    const [acertos_erros, setAE] = React.useState({ acertos: 0, erros: 0 })
    const [firstLine, setFirst] = React.useState([suffled_array_words.slice(0, final)])
    const [start, setStart] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)
    const [meters, setMetters] = React.useState(null)
    let _disabled_time_out = null;
    const calculateMetters = ( ) => {
        const {acertos, erros} = acertos_erros
        let ppm = (acertos) / 60
        let successful_rate = isNaN(acertos / (acertos + erros)) ? '0%' : acertos / ( Number(acertos + erros.toPrecision(2) )*100)  + '%'
        return {
            ppm,
            successful_rate
        }
    }
    
    const increment = () => {
        if (currentIndex[1] >= 9)
            setCurrentIndex([currentIndex[0] + 1, 0])
        else
            setCurrentIndex([currentIndex[0], currentIndex[1] + 1])
    }
    const nextLine = (initial, final) => {
        setFirst(state => [...state, suffled_array_words.slice(initial, final)])
    }
    const hasWhiteSpace = (s) => s.indexOf(' ') >= 0
    const handleTyping = (event) => {
        event.preventDefault();
        if (_disabled_time_out) clearTimeout(_disabled_time_out)
        let word = event.target.value.toString()
        if (word === ' ') return
        if (start === false) setStart(true);
        if (hasWhiteSpace(word)) {
            console.log(word.trim())
            if (word.trim() === firstLine[currentIndex[0]][currentIndex[1]]) {
                console.log('acertou miseravi', `${word} === ${firstLine[currentIndex[0]][currentIndex[1]]}`)
                setAE({ ...acertos_erros, acertos: acertos_erros.acertos + 1 })
            }
            else {
                console.log('Errrou', `${word} !== ${firstLine[currentIndex[0]][currentIndex[1]]}`)
                setAE(state => { return { ...state, erros: state.erros + 1 } })
            }
            if (currentIndex[1] >= 9) {
                nextLine(final, final + 10)
                setFinal(final + 10)
                setCurrentIndex([currentIndex[0] + 1, 0])
                setCurrentTypedWord('')
                return;
            }
            increment()
            setCurrentTypedWord('')
            return;
        }

        setCurrentTypedWord(word)
    }
    const handleStop = () => {
        setStart(false)
        setFinal(10)
        const results = calculateMetters()
        console.log(results)
        setMetters(results)
        setAE({acertos:0, erros:0})
        setFirst([suffled_array_words.slice(0, 10)])
        setCurrentIndex([0, 0])
        setCurrentTypedWord('')
        setDisabled(true)
        _disabled_time_out = setTimeout(() => {setDisabled(false); inputRef?.current.focus()}, 3000)
    }

    return (
        <Grid container
            spacing={1}
            style={{
                alignItems: "center",
                justifyContent: "center"
            }}>
            <Grid
                item
                sm={12}
                md={12}
                justifyContent="center"
                alignItems={'center'}

                style={{
                    minHeight: 100,
                    display: 'flex',
                    marginBottom: 20
                }}>
                <Typography variant={"h3"} component="h3">
                    Medidor de velocidade de Digitação
                </Typography>
            </Grid>
            <Grid item
                sm={12}
                md={6}
                style={{
                    marginBottom: 2
                }}>
                <WordList lines={firstLine} currentIndex={currentIndex} />
            </Grid>
            <Grid container
                alignItems="center"
                justifyContent="center">
                <Grid
                    item
                    sm={12}
                    md={5}
                    alignItems="center"
                    justifyContent="center"
                    style={{ display: 'center' }}>
                    <TextField
                        placeholder="Começe a Digitar"
                        style={{ width: '100%' }}
                        variant="outlined"
                        value={currentTypedWord}
                        ref={inputRef}
                        onChange={handleTyping}
                        disabled={disabled} 
                        />
                </Grid>
                <Grid
                    item
                    sm={12}
                    md={1}
                    alignItems="center"
                    justifyContent="center">{start ?
                        <Timer startCount={5} onOver={handleStop} />
                        : null}
                </Grid>
            </Grid>
            <Grid item
                md={12}>
                {meters &&
                    <Box>
                        <Typography>
                            {
                                meters.ppm
                            }
                        </Typography>
                        <Typography>
                            {
                                meters.successful_rate
                            }
                        </Typography>
                    </Box>
                }
            </Grid>
        </Grid>
    )
}
export default Dashboard