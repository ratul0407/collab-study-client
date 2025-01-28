function AllTutors({ tutors }) {
  return tutors?.map((tutor, index) => {
    return (
      <tr key={tutor._id}>
        <td>{++index}</td>
        <td className="max-w-fit">
          <img
            className="h-14 w-14 rounded-full object-cover"
            src={tutor.photo}
          />
        </td>
        <td>{tutor.name}</td>
        <td>{tutor.email}</td>
        <td>{tutor.role}</td>
      </tr>
    );
  });
}

export default AllTutors;
