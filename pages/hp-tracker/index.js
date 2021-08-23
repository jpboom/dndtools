import Head from 'next/head';
import Link from 'next/link';
import React, { useState, Fragment } from 'react';
import Modal from '../../components/modal';
import Button from '../../components/Button/Button';

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

    function openModal(type) {
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
        setModalSettings({
            show: true,
            type: type,
            title: title,
            message: message,
        });
        setModalSettings({
            show: true,
            type: type,
            title: title,
            message: message,
        });
    }

    function closeModal() {
        setModalSettings({ show: false, type: 'set', title: '', message: '' });
        setHpInput('');
    }

    function onHpInputChange() {
        const newInput = event.target.value;
        console.log('newInput = ', newInput);
        console.log('newInput.match(/^(d*)$/g) = ', newInput.match(/^(\d*)$/g));
        if (newInput.match(/^(\d*)$/g)) {
            setHpInput(newInput);
        }
    }

    function updateHpTotal() {
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
                    newHp =
                        Number.parseInt(currentHp) +
                        Number.parseInt(tempHp) -
                        Number.parseInt(hpInput);
                } else {
                    newHp = Number.parseInt(currentHp);
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

    let hpBlock = (
        <>
            <p className="text-6xl text-center">-</p>
            <p className="text-center">Set Max HP to get started</p>
        </>
    );
    if (maxHp > 0) {
        let hpPercentage = Math.floor((currentHp / maxHp) * 100);
        let hpColor = 'red-500';
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
                {tempHp > 0 ? (
                    <p className="text text-center">Temp HP: {tempHp}</p>
                ) : null}
                <p className={hpClasses}>{currentHp}</p>
                <p className="text-center">Max HP: {maxHp}</p>
            </>
        );
    }

    return (
        <React.Fragment>
            <Modal show={modalSettings.show} onClose={closeModal}>
                <div className="flex justify-between items-center pb-3">
                    <p className="text-2xl font-bold">{modalSettings.title}</p>
                </div>
                <p>{modalSettings.message}</p>
                <input
                    autoFocus
                    onChange={() => onHpInputChange()}
                    value={hpInput}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="tel"
                />
                <div className="flex justify-end pt-2">
                    <Button variant="text" handleClick={() => closeModal()}>
                        Cancel
                    </Button>
                    <Button handleClick={() => updateHpTotal()}>Apply</Button>
                </div>
            </Modal>
            <div className="p-2 shadow rounded bg-blue-900">
                <Head>
                    <title>D&amp;D Tools</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className="p-4 shadow rounded bg-white mb-2">
                    <h1 className="font-bold mb-4">HP Tracker</h1>
                    <p>
                        <Link href="/">
                            <a className="text-blue-400 hover:text-blue-700 transition-colors duration-300">
                                Home
                            </a>
                        </Link>
                    </p>
                </main>

                <section className="p-4 shadow rounded bg-white">
                    <Button handleClick={() => openModal('set')}>
                        Set Max HP
                    </Button>
                    {hpBlock}
                    <Button color="green" handleClick={() => openModal('heal')}>
                        Heal
                    </Button>
                    <Button color="red" handleClick={() => openModal('damage')}>
                        Damage
                    </Button>
                    <Button handleClick={() => openModal('temp')}>
                        Temp HP
                    </Button>
                </section>
            </div>
        </React.Fragment>
    );
}
