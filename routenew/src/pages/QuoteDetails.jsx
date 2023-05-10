import React from 'react'
import { Route, useParams } from 'react-router-dom';
import Comments from '../components/comments/Comments'
const QuoteDetails = () => {
  const params = useParams();
  return (
    <div>QuoteDetails {params.qouteId}
      <Route path={`/quotes/${params.qouteId}/comments`}>
        <Comments/>
      </Route>
    </div>

  )
}

export default QuoteDetails;