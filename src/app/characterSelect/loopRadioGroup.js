
import { memo } from 'react'
import { RadioGroup } from '@headlessui/react'

function characterInfo(character) {
    if(character !== '') {
        return (
            <>
                <span className="block sm:inline">
                    <img
                        className="h-4 w-4 m-1 sm:inline"
                        src={`https://firebasestorage.googleapis.com/v0/b/flyff-idle.appspot.com/o/images%2Fclass%2Fold_male%2Fvagrant.png?alt=media&token=916ae091-f983-4558-b458-b755df67813b`}
                        alt="Your Company"
                    />
                </span>{' '}
                    <span className="block sm:inline font-bold text-base">{character.name}</span>
                    <span className="hidden sm:mx-1 sm:inline" aria-hidden="true">
                        &middot;
                    </span>{' '}
                <span className="block sm:inline font-bold text-base">{character.class}</span>
            </>
        )
    } else {
        return(
            <>
                <span className="block sm:inline font-bold text-base">Click to create a new character</span>
            </>
        )
    }
  }

  
function characterLvlInfo(character) {
    if(character) {
        return(
            <>
                <span className="font-bold text-white text-base">Lvl {character.level}</span>
                <span className="ml-1 text-gray-200 sm:ml-0 text-sm">{character.penya} penya</span>
                <span className="ml-1 text-orange-300 sm:ml-0 text-xs">Last Save: 5/9/2023, 11:05:01 PM Europe/London</span>
            </>
        )
    }
}

function characterAction(character) {
    if(character) {
        return(
            <>
                <span className="block sm:inline text-sm">
                    {character.action}
                </span>{' '}
                <span className="hidden sm:mx-1 sm:inline" aria-hidden="true">
                    &middot;
                </span>{' '}
                <span className="block sm:inline text-sm">Since {character.lastOnline} ago</span>
            </>
        )
    }
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function selectCharacter(character) {
    console.log(character);
}
  
function createCharacter(setRightColumnView) {
    setRightColumnView("Character Information")
}

const LoopRadioGroup = ({characters, setRightColumnView}) => {
    return(
        <div>
            {characters.map((character, i) => (
                <div key={i} className='relative block rounded-lg border bg-gray-800 my-8 px-2 pt-2 pb-2 shadow-sm focus:outline-none sm:flex sm:flex-col'>
                    <span className="font-medium text-white px-2 pb-2 font-extrabold">Save slot #{i + 1}</span>
                    <RadioGroup.Option
                        onClick={() => {character !== '' ? selectCharacter(character) : createCharacter(setRightColumnView)}}
                        key={character ? character.name : null}
                        value={character}
                        className={({ checked, active }) =>
                        classNames(
                            checked ? 'border-transparent' : 'border-gray-300',
                            active ? 'border-indigo-600 ring-2 ring-indigo-600' : '',
                            'relative block cursor-pointer rounded-lg bg-gray-600 px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between'
                        )
                        }
                    >
                        {({ active, checked }) => (
                            <>
                                <span className="flex items-center">
                                <span className="flex flex-col text-sm">
                                    <RadioGroup.Label as="span" className="text-white">
                                    {characterInfo(character, setRightColumnView)}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description as="span" className="text-gray-200">
                                    {characterAction(character)}
                                    </RadioGroup.Description>
                                </span>
                                </span>
                                <RadioGroup.Description
                                as="span"
                                className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                                >
                                {characterLvlInfo(character)}
                                </RadioGroup.Description>
                                <span
                                className={classNames(
                                    active ? 'border' : 'border-2',
                                    checked ? 'border-indigo-600' : 'border-transparent',
                                    'pointer-events-none absolute -inset-px rounded-lg'
                                )}
                                aria-hidden="true"
                                />
                            </>
                        )}
                    </RadioGroup.Option>
                </div>
            ))}
        </div>
    )
}
export default memo(LoopRadioGroup)