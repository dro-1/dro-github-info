/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

const GHContainer = styled.div`
  padding: 2rem;
  margin: 0;
`
const Header = styled.h1`
  font-size: 2rem;
  text-align: center;
`
const ReposContainer = styled.div`
  padding: 1rem;
  border: solid 1px black;
  border-radius: 1rem;
`
const RepoContainer = styled.div`
  padding: 1rem;
  border-bottom: solid 1px black;
  display: flex;
  flex-direction: column;
`
const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%
`
const RepoLink = styled.a`
  padding: .5rem;
  border-radius: .5rem;
  margin: .5rem 0;
  background-color: #76d6e8;
  color: #fff;
  text-decoration: none;
  width: 30%;
  text-align: center;
`
const RepoHeader = styled.h3`
  margin: .5rem 0;
`
const RepoText = styled.em`
  font-style:normal;
`

export const GithubInfo = ({ username }) => {

  const [repos, setRepos] = useState([])
  useEffect(()=>{
    const fetchUserDetails = async () => {
      // eslint-disable-next-line no-undef
      try{
        const response = await fetch(`https://api.github.com/users/${username.trim()}/repos`)
        const userDetails = await response.json()
        console.log(userDetails)
        setRepos(userDetails)
      }catch(err){
      }
    }
    fetchUserDetails();
  },[username])

  return <GHContainer>
          <Header> {username} </Header>
          <ReposContainer>
            {
              repos.length > 0
            ? repos.map((repo,index) => 
                <RepoContainer key={index} >
                  <RepoHeader>{repo.name}</RepoHeader>
                  <RepoText>Created on {repo.created_at}</RepoText>
                  <RepoLink href={repo.html_url} > Go To Repo</RepoLink>
                  <Stats>
                    <RepoText>{repo.forks} Forks</RepoText>
                    <RepoText>{repo.stargazers_count} Stars</RepoText>
                    <RepoText>{repo.watchers} Watchers</RepoText>
                  </Stats>
                </RepoContainer>
              )
            : <RepoText>No Repos Available</RepoText>
            }
          </ReposContainer>
          <footer> By <a href='https://github.com/dro-1'>Dro</a></footer>
        </GHContainer>
}
