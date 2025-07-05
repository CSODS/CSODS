import Header from './components/Header';
import SearchBar from './components/SearchBar';
import UpButton from './components/UpButton';
import { ProjectList } from './components/ProjectList';

//#region Student Projects
export default function StudentProjects() {
  return (
    <div>
      <Header/>
      <SearchBar/>
      <ProjectList/>
      <UpButton/>
    </div>  
  );
}
//#endregion
