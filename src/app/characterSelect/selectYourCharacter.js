import { memo } from "react";
import { RadioGroup } from '@headlessui/react'
import LoopRadioGroup from './loopRadioGroup'

const SelectCharacter = ( {characters, selected, setSelected, setRightColumnView} ) => {
  console.log("child render");
  return (
    <div className="bg-gray-800 pt-8 px-4 pb-8 sm:px-6 lg:px-8 justify-center bg-opacity-60 h-full">       
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 content-center">
          <h1 className="text-3xl font-bold tracking-tight text-white text-center pb-4">Select your Character</h1>
        </div>
        <RadioGroup value={selected} onChange={setSelected} className="mx-10">
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-4">
            <LoopRadioGroup characters={characters} setRightColumnView={setRightColumnView}/>
          </div>
        </RadioGroup>
      </div>
  );
};

export default memo(SelectCharacter);