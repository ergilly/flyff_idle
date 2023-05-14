
import { memo } from 'react'
import { RadioGroup } from '@headlessui/react'

function characterInfo(charId) {
    if(charId !== 0) {
        return (
            <>
                <span className="block sm:inline">
                    <img
                        className="h-4 w-4 m-1 sm:inline"
                        src={`https://firebasestorage.googleapis.com/v0/b/flyff-idle.appspot.com/o/images%2Fclass%2Fold_male%2Fvagrant.png?alt=media&token=916ae091-f983-4558-b458-b755df67813b`}
                        alt="Your Company"
                    />
                </span>{' '}
                    <span className="block sm:inline font-bold text-base">{charId.name}</span>
                    <span className="hidden sm:mx-1 sm:inline" aria-hidden="true">
                        &middot;
                    </span>{''}
                <span className="block sm:inline font-bold text-base">{charId.class}</span>
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

  
function characterLvlInfo(charId) {
    if(charId) {
        return(
            <>
                <span className="font-bold text-white text-base">Lvl {charId.level}</span>
                <span className="ml-1 text-gray-200 sm:ml-0 text-sm">{charId.penya.toLocaleString("en-US")} Penya</span>
                <span className="ml-1 text-orange-300 sm:ml-0 text-xs">Last Save: 5/9/2023, 11:05:01 PM Europe/London</span>
            </>
        )
    }
}

function getLastOnline(time) {
    const lastOnline = new Date(time.seconds * 1000)
    const now = new Date()
    const since = (now.getTime() - lastOnline.getTime())/1000
    if(since < 60) {
        return `${Math.floor(since)} ${Math.floor(since) > 1 ? "Seconds" : "Second"}`
    } else if (since < 3600) {
        return `${Math.floor(since/60)} ${Math.floor(since/60) > 1 ? "Minutes" : "Minute"}`
    } else if (since < 86400) {
        return `${Math.floor(since/3600)} ${Math.floor(since/3600) > 1 ? "Hours" : "Hour"}`
    } else {
        return `${Math.floor(since/86400)} ${Math.floor(since/86400) > 1 ? "Days" : "Day"}`
    }
}

function characterAction(charId) {
    const lastOnline = charId.lastOnline ? getLastOnline(charId.lastOnline) : null
    const action  = charId.action === null ? "Idle" : charId.action
    if(charId) {
        return(
            <>
                <span className="block sm:inline text-sm">
                    {action}
                </span>{' '}
                <span className="hidden sm:mx-1 sm:inline" aria-hidden="true">
                    &middot;
                </span>{' '}
                <span className="block sm:inline text-sm">Since {lastOnline} ago</span>
            </>
        )
    }
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function selectCharacter(charId, router) {
    return router.push("/game")
}
  
function createCharacter(setRightColumnView) {
    setRightColumnView("Character Information")
}

const LoopRadioGroup = ({characters, setRightColumnView, router}) => {
    return(
        <div>
            {characters.map((character, i) => {
                const charId = character[Object.keys(character)[0]]
                console.log(charId);
                return (
                    <div key={i} className='relative block rounded-lg border bg-gray-800 my-8 px-2 pt-2 pb-2 shadow-sm focus:outline-none sm:flex sm:flex-col'>
                        <span className="font-medium text-white px-2 pb-2 font-extrabold">Save slot #{i + 1}</span>
                        <RadioGroup.Option
                            onClick={() => {charId !== 0 ? selectCharacter(charId, router) : createCharacter(setRightColumnView)}}
                            key={charId.name}
                            value={charId.name}
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
                                        {characterInfo(charId, setRightColumnView)}
                                        </RadioGroup.Label>
                                        <RadioGroup.Description as="span" className="text-gray-200">
                                        {characterAction(charId)}
                                        </RadioGroup.Description>
                                    </span>
                                    </span>
                                    <RadioGroup.Description
                                    as="span"
                                    className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                                    >
                                    {characterLvlInfo(charId)}
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
                )
            })}
        </div>
    )
}
export default memo(LoopRadioGroup)