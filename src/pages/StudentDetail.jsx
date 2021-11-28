import React, { useState } from 'react';
import { useGetJSON } from '../hooks/useGetJSON';
import { Maybe } from '../components/Maybe';
import Button from '../components/Button';
import { Formik, Field, Form } from 'formik';

function StudentDetail(props) {
  const [editMode, setEditMode] = useState(false);

  const { data, loading } = useGetJSON(
    'http://18.157.77.111/students/' + props.student.id
  );
  const student = data;
  if (loading) {
    return <p>Loading student data...</p>;
  }
  const initials = student.firstName[0] + student.lastName[0];

  return (
    <div className="student-detail-container">
      <div className="student-detail-initials">{initials}</div>
      {editMode ? (
        <Formik
          initialValues={student}
          onSubmit={(values) => {
            console.log('RAW', values);
            console.log('JSON.stringify', JSON.stringify(values));
            fetch('http://18.157.77.111/students/' + student.id, {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            }).then((response) => {
              if (response.ok) {
                setEditMode(false);
              }
            });
          }}
        >
          <Form className="flex flex-col gap-1">
            <Field name="firstName" type="text" className="input" />
            <Field name="lastName" type="text" className="input" />
            <Field name="gender" type="text" className="input" />
            <Field name="house" type="text" className="input" />
            <Field name="year" type="number" className="input" />
            <button type="submit" className="input bg-indigo-600 text-white">
              Submit
            </button>
          </Form>
        </Formik>
      ) : (
        <>
          <h2 className="student-detail-name">
            {student.firstName} {student.lastName}
          </h2>
          <p>{student.house}</p>
          <p>{student.year}</p>
        </>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>
          <Maybe fallback="Missing description">{data.description}</Maybe>
        </p>
      )}
      <Button onClick={() => setEditMode(true)}>Edit</Button>
    </div>
  );
}

export default StudentDetail;

/*function StudentDetail(props) {
  const { student } = props;
  const initials = student.firstName[0] + student.lastName[0];

  const [studentDetails, setStudentDetails] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://18.157.77.111/students/' + student.id)
      .then((response) => response.json())
      .then((json) => {
        setStudentDetails(json);
        setLoading(false);
      });
  }, [student.id]);

  return (
    <div className="student-detail-container">
      <div className="student-detail-initials">{initials}</div>
      <h2 className="student-detail-name">
        {student.firstName} {student.lastName}
      </h2>
      {isLoading ? <p>Loading...</p> : <p>{studentDetails.description}</p>}
    </div>
  );
}

export default StudentDetail;*/

//komponenta children obsah mezi tagy, vnorene elemnty jsou children
