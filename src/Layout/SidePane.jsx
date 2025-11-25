import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import SmartNotesAI from "../Component/SmartNotesAI";

function SidePane() {
    const pane = useSelector(state => state.notes.rightSidePane || "");
  return (
    <div>
      {pane === "AI" && <SmartNotesAI />}
     
    </div>
  )
}

export default SidePane
