import { Box } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";
import { HelpText, HelpTextFocus } from "../helpTexts";

interface CustomTabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


function CustomTabPanel(props: CustomTabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

interface TabPanelProps {
    index: number;
    value: number;
    helpText: HelpText;
}
const Paragrafh = styled.p<{
    selected: boolean;
}>`
    cursor: pointer;
    background-color: ${(p) => p.selected ? '#1976d26a' : 'none'};
    &:hover {
        background-color: ${(p) => p.selected ? '#1976d297' : '#1976d22f'};
    }
    padding: 10px;
    border-radius: 10px;
`
const ImageBox = styled.div`
    width: 100%;
    img{
        width: 100%;
    }
    position: relative;
    border-radius: 10px;
    overflow: hidden;
`;
const Blackout = styled.div<HelpTextFocus>`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    &::before{
        content: '';
        position: absolute;
        top: ${(p) => p.top}%; 
        left: ${(p) => p.left}%; 
        width: ${(p) => p.width}%;
        height: ${(p) => p.height}%; 
        background-color: transparent;
        box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.8);
        z-index: 20;
        border: 2px solid white; 
        transition: background-color 0.5s ease; 
    }
`;
interface SelectParagrafh {
    index: number;
    focus: HelpTextFocus;
}
export default function TabPanel({ index, helpText, value }: TabPanelProps) {
    const [selectParagrafh, setSelectParagrafh] = useState<SelectParagrafh | undefined>();
    const [selectHoverParagrafh, setSelectHoverParagrafh] = useState<SelectParagrafh | undefined>();

    return (
        <CustomTabPanel value={value} index={index}>
            <Box
                height={'500px'}
                maxHeight={'calc(100vh - 100px)'}
                overflow={'auto'}
                display={'flex'}
                flexDirection={'column'}
                gap='10px'
                paddingX={'0px'}
            >
                <Box
                    style={{
                        overflow: 'auto',
                        maxHeight: '180px', // Ajuste conforme necessário
                        scrollbarWidth: 'thin',  // Para navegadores baseados em WebKit, você pode usar ::-webkit-scrollbar
                        scrollbarColor: 'rgba(0,0,0,0.1) rgba(0,0,0,0.01)'
                    }}
                    gap={'10px'}
                    overflow={'auto'}>
                    {
                        helpText.help.map((con, i) => {
                            const newSelectParagrafh: SelectParagrafh = {
                                focus: con.focus,
                                index: i
                            }
                            return <Paragrafh
                                onMouseOut={() => setSelectHoverParagrafh(undefined)}
                                onMouseOver={() => setSelectHoverParagrafh(newSelectParagrafh)}
                                onClick={() => setSelectParagrafh(selectParagrafh?.index === i ? undefined : newSelectParagrafh)}
                                selected={selectParagrafh?.index === i}
                            >
                                <b>{i + 1} {con.highlight}:</b> {con.text}
                            </Paragrafh>
                        })

                    }
                </Box>
                <ImageBox>
                    <img src={helpText.img} width={'100%'} />
                    {
                        <>
                            {
                                selectHoverParagrafh && !selectParagrafh &&
                                <Blackout {...selectHoverParagrafh.focus} />
                            }
                            {
                                selectParagrafh &&
                                <Blackout {...selectParagrafh.focus} />
                            }
                        </>
                    }
                </ImageBox>

            </Box>
        </CustomTabPanel>
    )
}