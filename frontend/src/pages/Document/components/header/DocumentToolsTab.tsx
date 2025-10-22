import ZoomTools from "./ZoomTools"
import { Flex , Button, Tooltip} from "@mantine/core";
import SimpleCombobox from "@/components/other/SimpleCombobox";
import { useState } from "react";
import { FaUndo, FaRedo } from "react-icons/fa";

type DocumentToolsTabPropsType = {
  zoomState: [string | null, React.Dispatch<React.SetStateAction<string | null>>];
};
export default function DocumentToolsTab({zoomState}:DocumentToolsTabPropsType)
{

 const fontSizeState = useState<string|null>('12pt')
 const fontSizeValues = [
  {value: '10pt', label: '10 pt'},
  {value: '11pt', label: '11 pt'},
  {value: '12pt', label: '12 pt'},
 ]


  const fontTypeState = useState<string|null>('sans')
 const fontTypeValues = [
  {value: 'sans', label: 'Sans'},
  {value: 'roman', label: 'Roman'},
  {value: 'typewriter', label: 'Typewriter'},
 ]

   const orientationState = useState<string|null>('')
 const orientationValues = [
  {value: '', label: 'Vertical'},
  {value: 'landscape', label: 'Horizontal'},
 ]

  const columnsState = useState<string|null>('onecolumn')
 const columnsValues = [
  {value: 'onecolumn', label: 'One column'},
  {value: 'twocolumns', label: 'Two columns'},
 ]
 //const [fontSize, setFontSize] = fontSizeState;

    return <Flex align='center' gap='xl'>
    {/* <SimpleCombobox tooltip="Default font"  width='6rem' values={fontTypeValues} valueState={fontTypeState} /> */}
    <Flex mr='4rem' ><Tooltip
            label='Undo'
            //label={buttonsNotToRender.includes(idx) ? 'true' : 'false'}
            color="cyan"
            position="bottom"
            offset={5}
            withArrow
            arrowOffset={50}
            arrowSize={7}
            arrowRadius={2}
          
          ><Button variant='format'><FaUndo/></Button></Tooltip> <Tooltip
            label='Redo'
            //label={buttonsNotToRender.includes(idx) ? 'true' : 'false'}
            color="cyan"
            position="bottom"
            offset={5}
            withArrow
            arrowOffset={50}
            arrowSize={7}
            arrowRadius={2}
          
          ><Button variant='format'><FaRedo/></Button></Tooltip></Flex>
    <SimpleCombobox tooltip="Default font size"  width='5rem' values={fontSizeValues} valueState={fontSizeState} />
    <SimpleCombobox tooltip="Orientation"  width='6rem' values={orientationValues} valueState={orientationState} />
    <SimpleCombobox tooltip="Columns"  width='8rem' values={columnsValues} valueState={columnsState} />
    {/* <ZoomTools zoomState={zoomState}/> */}</Flex>
}