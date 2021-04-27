import { useEffect, Fragment } from 'react';
import Uilayer from '../components/UI/uiLayer ';
import StartItem from '../components/startitem';
import { useState, createContext } from 'react';
import { useRouter } from 'next/router';
import classes from '../components/UI/button.module.css';

import { DUMMY_EVENTS } from '../data';

const UserIntrest = createContext();
const StartUp = () => {
  const [userInt, setUserInt] = useState([]);
  const router = useRouter();
  const addUserInt = (id) => {
    setUserInt([...userInt, id]);
  };
  const data = DUMMY_EVENTS;
  console.log(userInt);
  return (
    <Fragment>
      <UserIntrest.Provider value={userInt}>
        <Uilayer>
          {data.map((i) => (
            <span key={i.id}>
              <StartItem items={i} addUserInt={addUserInt} />
            </span>
          ))}
        </Uilayer>
        {userInt.length > 0 && <button className={classes.btn}>Go</button>}
      </UserIntrest.Provider>
    </Fragment>
  );
};

export default StartUp;
