import Head from 'next/head';
import Link from 'next/link';
import React, { useState, Fragment } from 'react';


export default function Home() {
    const [maxHp, setMaxHp] = useState(0);
    const [currentHp, setCurrentHp] = useState(0);
    const [modalSettings, setModalSettings] = useState({
        show: false,
        type: 'set',
    });
    const [hpInput, setHpInput] = useState('');
    let modal = null;

    function closeModal () {
        setModalSettings({show:false,type:'set'});
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
            newHp = Number.parseInt(currentHp) - Number.parseInt(hpInput);
            if (newHp < 0) {
                newHp = 0;
            }
            setCurrentHp(newHp);
        }
        closeModal();
    }

    if (modalSettings.show) {
        modal = (
            <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center">
                <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                    <div className="modal-content py-4 text-left px-6">
                        <div className="flex justify-between items-center pb-3">
                            <p className="text-2xl font-bold">Simple Modal!</p>
                        </div>
                        <p>Enter amount of HP to {modalSettings.type}</p>
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
                        onClick={() => setModalSettings({show:true,type:'set'})}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Set Max HP
                    </button>
                    <p className="text-6xl text-center">{currentHp}</p>
                    <p className="text-center">Max HP: {maxHp}</p>
                    <button
                        onClick={() => setModalSettings({show:true,type:'heal'})}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Heal
                    </button>
                    <button
                        onClick={() => setModalSettings({show:true,type:'damage'})}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Damage
                    </button>
                </section>
            </div>
        </React.Fragment>
    );
}
