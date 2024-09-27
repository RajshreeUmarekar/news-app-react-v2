import { ChangeEvent, useEffect, useState, Profiler, useContext } from 'react';
import { Alert, Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label } from 'reactstrap';
import '../Component.css';
import _ from 'lodash';
import { useStoreActions, useStoreState } from '../../store/appStore';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

const Home = () => {

  function clockPerformance( 
    profilerId:any,
    mode:any,
    actualTime:any,
    baseTime:any,
    startTime:any,
    commitTime:any,
  ) {
    console.log({
      profilerId,
      mode,
      actualTime,
      baseTime,
      startTime,
      commitTime,
    });
    setTimeTaken(actualTime);
  }
    const navigate = useNavigate();
    const [inputKey, setInputKey] = useState("Search Criteria");
    const [inputValue, setInputValue] = useState("");
    const [isListEmpty, setIsListEmpty] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);
    const [flag, setFlag] = useState(false);
    const {setAuthenticated } = useContext(AuthContext);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const newsContentList = useStoreState((state) => state.newsContentList);
    const newsArticleList = useStoreState((state) => state.newsArticleList);
    const fetchNewsList = useStoreActions((actions) => actions.fetchNewsList);
    const resetStatus = useStoreActions((actions) => actions.resetStatus);

    useEffect(() => {
      if(inputKey === 'Content' && !_.isEmpty(newsContentList)){
          setIsListEmpty(false);
      }else if(inputKey === 'Article' && !_.isEmpty(newsContentList)){
        setIsListEmpty(false);
      }else{
        setIsListEmpty(true);
      }
    },[newsArticleList, newsContentList, inputKey]);
  
    const getList = async (payload:any) => {
      fetchNewsList(payload);
      setFlag(true);
    }

    const logout = async () => {
      resetStatus();
      setAuthenticated(false);
      navigate('/login');
    }

    const handleKeyChange = (s: string) => {
      setInputKey(s);
    };
  
    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const contentList = newsContentList.response.results.map((item:any) => {
      return (
          <li key={item.id}>
            <a href={item.webUrl}>{item.webTitle}</a>
          </li>
      );
    });

    const articleList = newsArticleList.response.docs.map((item:any) => {
      return (
          <li key={item._id}>
             <a href={item.web_url}>{item.abstract}</a>
          </li>
      );
    });

  
  return (
    <div className="Component">
        <Col style={{textAlign:'right'}}>
          <Button type="button" color="danger" onClick= {() => logout()}>
            Logout
          </Button>
        </Col>
      <center><h2 style={{color: '#14cff5'}}>Get UK and US latest news on just one click!</h2></center>
      <hr/>

      <Form>
        <FormGroup row>
        <Label for="key"  sm={4}>Search Key:</Label>
        <Col sm={8}>
          <Dropdown isOpen={dropdownOpen} toggle={toggle} required>
            <DropdownToggle caret className="dropdown-toggle">{inputKey}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => handleKeyChange('Article')} dropdownvalue="Article">Article</DropdownItem>
              <DropdownItem onClick={() => handleKeyChange('Content')} dropdownvalue="Content">Content</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="keyword"  sm={4}>Search Value:</Label>
          <Col sm={8}>
              <Input id="keyword" name="keyword" placeholder="Enter Search Keyword" type="text"
              onChange={handleValueChange}  value={inputValue} />
          </Col>
        </FormGroup>
        <Button type="button" onClick= {() => getList({key:inputKey, value:inputValue})}>
          Search
        </Button>
      </Form>

      <br/><br/>
      <Profiler id="test" onRender={clockPerformance}>
      {!isListEmpty && inputKey === 'Content' && 
        <Card>
          <CardHeader>
            <p><b>Total No. of Pages:</b> {newsContentList.response.pages}</p>
            <p><b>Page No. Retreived:</b> {newsContentList.response.currentPage}</p>
            <p><b>Total Time Taken:</b> {timeTaken} ms</p>
          </CardHeader>
          <CardBody>
            <CardTitle tag="h3">
              Search Results
            </CardTitle>
            <CardText>
              <div>{contentList}</div>
            </CardText>
          </CardBody>
          <CardFooter>
            <div className="row">
            <Col><p style={{textAlign:'left'}}><b>Previous Page No.</b> {newsContentList.response.currentPage-1}</p></Col>
            <Col><p style={{textAlign:'right'}}><b>Next Page No.</b> {newsContentList.response.currentPage+1}</p></Col>
            </div>
          </CardFooter>
        </Card>
      }

      {!isListEmpty && inputKey === 'Article' && 
        <Card>
          <CardHeader>
            <p><b>Total Time Taken:</b> {timeTaken} ms</p>
          </CardHeader>
          <CardBody>
            <CardTitle tag="h3">
              Search Results
            </CardTitle>
            <CardText>
              <div>{articleList}</div>
            </CardText>
          </CardBody>
        </Card>
      }
      </Profiler>

      {isListEmpty && flag &&
        <Alert color="danger">
          No results found. Please select a valid criteria and retry!
        </Alert>
      }

    </div>
    
  );
}

export default Home;
