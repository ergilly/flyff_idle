'use client'
import React, { memo, useEffect, useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";
import getData from "@/firebase/firestore/getData";
import queryDocs from "@/firebase/firestore/queryDocs";
import getImageUrl from "@/firebase/storage/getImageUrl";
import { mapMobs } from '@/calc/utils'

const mobRanks = ['small', 'normal', 'captain', 'giant']

const maps = [
    {name: 'world', image: 'https://firebasestorage.googleapis.com/v0/b/flyff-idle.appspot.com/o/images%2Fapp%2Fmaps%2Fworldmap.png?alt=media&token=dea9124a-8eb1-4135-ab5c-a9bc4e5e088e'},
    {name: 'flaris', image: 'https://firebasestorage.googleapis.com/v0/b/flyff-idle.appspot.com/o/images%2Fapp%2Fmaps%2Fcontinents%2FFlaris.png?alt=media&token=7caae619-1957-49da-a2bc-fed2b7269003'},
    {name: 'saintmorning', image: 'https://firebasestorage.googleapis.com/v0/b/flyff-idle.appspot.com/o/images%2Fapp%2Fmaps%2Fcontinents%2FMadrigal-Saintmorning.png?alt=media&token=bcbc35ee-a78b-41f4-b97b-a0f1480d18eb'},
    {name: 'rhisis', image: 'https://firebasestorage.googleapis.com/v0/b/flyff-idle.appspot.com/o/images%2Fapp%2Fmaps%2Fcontinents%2FMadrigal-Rhsis.png?alt=media&token=5cc9b3d2-9016-43b6-9bc5-93e92b2dca6f'},
    {name: 'darkon1', image: 'https://firebasestorage.googleapis.com/v0/b/flyff-idle.appspot.com/o/images%2Fapp%2Fmaps%2Fcontinents%2FDarkon1.png?alt=media&token=d4210833-0458-4509-a39b-208b10850dd3'},
    {name: 'darkon3', image: 'https://firebasestorage.googleapis.com/v0/b/flyff-idle.appspot.com/o/images%2Fapp%2Fmaps%2Fcontinents%2FDarkon3.png?alt=media&token=4848eecf-7d0f-4972-b25f-84b214a1bd31'},
    {name: 'flarine', image: 'https://firebasestorage.googleapis.com/v0/b/flyff-idle.appspot.com/o/images%2Fapp%2Fmaps%2Ftowns%2FFlarine_Town_Map.png?alt=media&token=5b3f53b1-2206-4aee-b2c0-91ca51c9f232'},
    {name: 'saincity', image: 'https://firebasestorage.googleapis.com/v0/b/flyff-idle.appspot.com/o/images%2Fapp%2Fmaps%2Ftowns%2FSain_City_Town_Map.png?alt=media&token=5d52e3a7-e253-46fc-9f00-76cb6ba01ac5'},
    {name: 'darken', image: 'https://firebasestorage.googleapis.com/v0/b/flyff-idle.appspot.com/o/images%2Fapp%2Fmaps%2Ftowns%2FDarken_Town_Map.png?alt=media&token=05db1469-7eed-4a32-8f67-5e03335852b6'},
]


const Map = () => {
    const [map, setMap] = useState('world')
    const [world, setWorld] = useState(null)
    const [monsters, setMonsters] = useState(null)

    useEffect(() => {
        async function getWorldData() {
        const {result, error} = await getData('world', '6063')
        if(error) {
            return console.log(error);
        }
        await setWorld(result.data())
        }
        getWorldData()
    }, [])
    
    useEffect(() => {
        async function getMobData() {
        const { result, error } = await queryDocs('monster', 'location.world', world.id)
        if(error) {
            return console.log(error);
        }
        await setMonsters(result)
        }
        getMobData()
    }, [world])
    console.log(world);
    console.log(monsters);
    
    async function mobMapElements(mapMobsPopulated) {
        console.log('hello');
        console.log(getImageUrl('aibatt.png'));
        return(
            <>
                {mapMobsPopulated.map((mob, i) => (
                    <div key={i}>
                        <img></img>
                    </div>
                ))}
            </>
        )
        
    }

    const mapMobsPopulated = mapMobs.flaris.map(mob => {
        let array = []
        for(let rank of mobRanks) {
            if(monsters) {
                let monster = monsters.find((monster) => {
                    return monster.name.en.includes(mob) && monster.rank === rank
                });
                array.push(monster);
            }
        }
        console.log(array);
        return array
    })
    console.log(mapMobsPopulated);

    const Controls = ({ zoomIn, zoomOut, resetTransform }) => (
        <span className="pt-8 pl-8 z-10 absolute inline-flex rounded-md shadow-sm">
          <button
            onClick={() => zoomIn()}
            type="button"
            className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            Zoom In
          </button>
          <button
            onClick={() => zoomOut()}
            type="button"
            className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            Zoom Out
          </button>
          <button
            onClick={() => resetTransform()}
            type="button"
            className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            Reset
          </button>
        </span>
    
    );
    
    return( 
        <>
            <TransformWrapper
                minScale={0.5}
                initialScale={0.5}
                initialPositionX={188}
                initialPositionY={45}
            >
                {(utils) => (
                    <React.Fragment>
                        <Controls {...utils} />
                        <TransformComponent wrapperClass={'relative w-auto h-[900px] border-2 rounded-md m-4'} contentClass="relative w-auto">
                            {maps.map((element, i) => (
                                <div key={i}>
                                    {() => {mobMapElements(mapMobsPopulated)}}
                                    {map === element.name && <img src={element.image}></img>}
                                </div>
                            ))}
                        </TransformComponent>
                    </React.Fragment>
                )}
            </TransformWrapper>
            
        </>
    )
}
export default memo(Map)


