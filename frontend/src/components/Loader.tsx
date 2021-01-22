import { HashLoader } from 'react-spinners'

interface LoaderProps {
   loading: boolean
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
   return (
      loading ? (
         <div className="first">
            <div>
               <HashLoader loading={loading} color="white" size={150} />
            </div>
         </div>
      ) : <></>
   )
}

export default Loader
