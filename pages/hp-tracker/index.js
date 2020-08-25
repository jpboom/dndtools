import Head from 'next/head';
import Link from 'next/link';
import React, { useState, Fragment } from 'react';


export default function Home() {
    const [maxHp, setMaxHp] = useState(0);
    const [currentHp, setCurrentHp] = useState(0);
    const [tempHp, setTempHp] = useState(0);
    const [modalSettings, setModalSettings] = useState({
        show: false,
        type: '',
        title: '',
        message: '',
    });
    const [hpInput, setHpInput] = useState('');

    function openModal (type) {
        let title;
        let message;
        if (type === 'set') {
            title = 'Set character HP';
            message = 'Enter your maximum HP';
        } else if (type === 'heal') {
            title = 'Healing';
            message = 'Enter the amount of HP to heal';
        } else if (type === 'damage') {
            title = 'Damage';
            message = 'Enter the amount of damage to take';
        } else if (type === 'temp') {
            title = 'Temporary HP';
            message = 'Enter the amount of temp HP you have gained';
        }
        setModalSettings({show:true,type:type,title:title,message:message});
        setModalSettings({show:true,type:type,title:title,message:message});
    }

    function closeModal () {
        setModalSettings({show:false,type:'set',title:'',message:''});
        setHpInput('');
    }

    function onHpInputChange () {
        const newInput = event.target.value;
        if (newInput.match(/^(\d*)$/g)) {
            setHpInput(newInput);
        }
    }

    function updateHpTotal () {
        let newHp = 0;
        let newTempHp = 0;
        if (modalSettings.type === 'set') {
            setMaxHp(hpInput);
            setCurrentHp(hpInput);
        } else if (modalSettings.type === 'heal') {
            newHp = Number.parseInt(currentHp) + Number.parseInt(hpInput);
            if (newHp > maxHp) {
                newHp = maxHp;
            }
            setCurrentHp(newHp);
        } else if (modalSettings.type === 'damage') {
            if (tempHp > 0) {
                newTempHp = Number.parseInt(tempHp) - Number.parseInt(hpInput);
                if (newTempHp < 0) {
                    newTempHp = 0;
                }
                if (tempHp < hpInput) {
                    newHp = Number.parseInt(currentHp) - (Number.parseInt(hpInput) - tempHp);
                } else {
                    newHp = Number.parseInt(currentHp) - Number.parseInt(hpInput);
                }
            } else {
                newHp = Number.parseInt(currentHp) - Number.parseInt(hpInput);
            }
            if (newHp < 0) {
                newHp = 0;
            }
            setTempHp(newTempHp);
            setCurrentHp(newHp);
        } else if (modalSettings.type === 'temp') {
            newHp = Number.parseInt(hpInput);
            if (newHp > tempHp) {
                setTempHp(newHp);
            }
        }
        closeModal();
    }

    let modal = null;
    if (modalSettings.show) {
        modal = (
            <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center">
                <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                    <div className="modal-content py-4 text-left px-6">
                        <div className="flex justify-between items-center pb-3">
                            <p className="text-2xl font-bold">{modalSettings.title}</p>
                        </div>
                        <p>{modalSettings.message}</p>
                        <input
                            autoFocus
                            onChange={() => onHpInputChange()}
                            value={hpInput}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="text" />
                        <div className="flex justify-end pt-2">
                            <button
                                onClick={() => closeModal()}
                                className="cursor-pointer px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2">
                                Cancel
                            </button>
                            <button
                                onClick={() => updateHpTotal()}
                                className="cursor-pointer modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400">
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    let hpBlock = (
        <>
            <p className="text-6xl text-center">-</p>
            <p className="text-center">Set Max HP to get started</p>
        </>
    );
    if (maxHp > 0) {
        let hpPercentage = Math.floor((currentHp / maxHp) * 100);
        let hpColor = 'red-500';
        console.log('hpPercentage = ', hpPercentage);
        if (hpPercentage >= 75) {
            hpColor = 'green-500';
        } else if (hpPercentage >= 50) {
            hpColor = 'yellow-500';
        } else if (hpPercentage >= 25) {
            hpColor = 'orange-500';
        }
        let hpClasses = `text-6xl text-center text-${hpColor}`;
        hpBlock = (
            <>
                {tempHp > 0 ? <p className="text text-center">Temp HP: {tempHp}</p> : null}
                <p className={hpClasses}>{currentHp}</p>
                <p className="text-center">Max HP: {maxHp}</p>
            </>
        );
    }

    return (
        <React.Fragment>
            {modal}
            <div className="p-2 shadow rounded bg-teal-900">
                <Head>
                    <title>D&amp;D Tools</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className="p-4 shadow rounded bg-white mb-2">
                    <h1 className="font-bold mb-4">HP Tracker</h1>
                    <p><Link href="/"><a className="text-teal-400 hover:text-teal-700 transition-colors duration-300">Home</a></Link></p>
                </main>

                <section className="p-4 shadow rounded bg-white">
                    <button
                        onClick={() => openModal('set')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Set Max HP
                    </button>
                    {hpBlock}
                    <button
                        onClick={() => openModal('heal')}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Heal
                    </button>
                    <button
                        onClick={() => openModal('damage')}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Damage
                    </button>
                    <button
                        onClick={() => openModal('temp')}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Temp HP
                    </button>
                </section>
            </div>
        </React.Fragment>
    );
}
