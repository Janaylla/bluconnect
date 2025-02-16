import { Theme } from "@emotion/react";
import { Box, Modal, SxProps, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { routes } from "../../../router/router";
import TabPanel from "./TabPanel";
import { helpTexts } from "./helpTexts";

interface HelpProp {
  onClose: () => void;
  open: boolean;
}
const style: SxProps<Theme> = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'calc(100% - 20px)',
  maxWidth: '800px',
  bgcolor: 'background.paper',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4
};


export function Help({ onClose, open }: HelpProp) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [tabs, setTabs] = useState<JSX.Element[]>([]);
  const [customTabPanel, setCustomTabPanel] = useState<JSX.Element[]>([]);
  useEffect(() => {
    const newTabs: JSX.Element[] = [];
    const newCustomTabPanel: JSX.Element[] = [];
    let index = 0;
    helpTexts.forEach((helpText) => {
      newTabs.push(<Tab
        label={helpText.title}
        id={`simple-tab-${index}`}
        aria-controls={`simple-tabpanel-${index}`}
      />)
      newCustomTabPanel.push(<TabPanel
        index={index}
        helpText={helpText}
        value={value}
      />)
      index++;

    })
    setCustomTabPanel(newCustomTabPanel);
    setTabs(newTabs)
  }, [value])

  return <>
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ maxWidth: '100%', bgcolor: 'background.paper' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {tabs}
          </Tabs>
        </Box>
        {customTabPanel}
      </Box>

    </Modal>
  </>
}