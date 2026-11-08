import { useState } from 'react';
import { Key } from '../classes/Key';
import { Person } from '../classes/Person';
import { MyHouse } from '../classes/MyHouse';

export const HouseControl = () => {
  const [house, setHouse] = useState<MyHouse | null>(null);
  const [person, setPerson] = useState<Person | null>(null);
  const [stranger, setStranger] = useState<Person | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [isDoorOpen, setIsDoorOpen] = useState<boolean>(false);
  const [tenantsCount, setTenantsCount] = useState<number>(0);

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, message]);
  };

  const createScenario = () => {
    const houseKey = new Key();
    const newHouse = new MyHouse(houseKey);
    const owner = new Person(houseKey);
    const wrongPerson = new Person(new Key());

    setHouse(newHouse);
    setPerson(owner);
    setStranger(wrongPerson);
    setIsDoorOpen(false);
    setTenantsCount(0);
    setLogs(['Будинок створено. Видано правильний та чужий ключі.']);
  };

  const handleOpenDoor = () => {
    if (!house || !person) return;
    const success = house.openDoor(person.getKey());
    setIsDoorOpen(house.isDoorOpen());
    addLog(success ? 'Правильний ключ! Двері відчинено.' : 'Ключ не підходить.');
  };

  const handleWrongKey = () => {
    if (!house || !stranger) return;
    const success = house.openDoor(stranger.getKey());
    setIsDoorOpen(house.isDoorOpen());
    addLog(success ? 'Двері відчинено.' : 'Чужий ключ не підійшов!');
  };

  const handleComeIn = () => {
    if (!house || !person) return;
    const success = house.comeIn(person);
    if (success) {
      setTenantsCount(house.tenants.length);
      addLog('Мешканець успішно зайшов у будинок!');
    } else {
      addLog('Двері зачинені! Мешканець не може увійти.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>


      <button onClick={createScenario}>Згенерувати будинок і ключі</button>

      {house && (
        <div style={{ marginTop: '20px' }}>
          <p>Стан дверей: <strong>{isDoorOpen ? 'Відкриті 🟢' : 'Закриті 🔴'}</strong></p>
          <p>Мешканців всередині: <strong>{tenantsCount}</strong></p>

          <div style={{ display: 'flex', gap: '8px', margin: '15px 0' }}>
            <button onClick={handleOpenDoor}>Відкрити своїм ключем</button>
            <button onClick={handleWrongKey}>Спробувати чужий ключ</button>
            <button onClick={handleComeIn}>Увійти в будинок</button>
          </div>
        </div>
      )}

      <h3>Лог дій:</h3>
      <ul style={{ background: '#f4f4f4', padding: '15px 25px', borderRadius: '6px', color: '#333' }}>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
};