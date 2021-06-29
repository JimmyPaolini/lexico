import { GetServerSideProps } from "next"

export default function index(): JSX.Element {
  return <></>
}

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: { destination: "/search", permanent: true },
})
