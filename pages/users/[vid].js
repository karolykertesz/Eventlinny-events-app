import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const ValidPage = () => {
  const [vError, setVError] = useState();
  const router = useRouter();
  const id = router.query.vid;
  useEffect(() => {
    const getId = async () => {
      try {
        const data = await fetch(`/api/users/${id}`);
        const mess = await data.json();
        console.log(mess);
        if (mess.error) {
          setVError(mess.error);
        } else {
          setVError(mess.message);
          router.push('/startup');
        }
      } catch (err) {
        console.log(err);
      }
    };
    getId();
  }, [id]);

  return <div>{vError}</div>;
};

export default ValidPage;
// c5319c11-188f-4768-bb47-8ee6711cfda9
