import { useGetSpeakerSessionsQuery } from '@-local/db/lib/api'
import styled from '@emotion/native'
import Markdown from 'components/Markdown'
import Text from 'components/Text'
import { format, parseISO } from 'date-fns'
import { pl } from 'date-fns/locale'
import usePolling from 'hooks/usePolling'
import { NetworkInformationContext } from 'providers/NetworkInformation'
import React, { FC, useContext } from 'react'

type SpeakerSessionsProps = {
  id: string
}

const formatDate = (date?: string) =>
  date ? format(parseISO(date), 'EEEE, HH:mm', { locale: pl }) : ''

const SpeakerSessions: FC<SpeakerSessionsProps> = ({ id }) => {

  const { isConnected } = useContext(NetworkInformationContext)
  const { data, startPolling, stopPolling } = useGetSpeakerSessionsQuery({
    variables: { speaker_id: id },
    fetchPolicy: isConnected ? 'cache-and-network' : 'cache-only',
  })
  usePolling(startPolling, stopPolling, 10000)
  const hasItems = data && (data?.session.length > 0 || data?.topic.length > 0)

  return hasItems ? (
    <>
      <SessionsHeader>Sesje</SessionsHeader>
      {data?.session?.map((session) => (
        <Markdown key={session.id}>{`- **${session.name}**\n${formatDate(session.begins_at)}${
          session.location ? `, ${session.location}` : ''
        }`}</Markdown>
      ))}
      {data?.topic?.map((topic) => {
        return (
          <Markdown key={topic.id}>{`- **${topic.session.name}:** ${topic.subject}\n${formatDate(
            topic.session.begins_at
          )}${topic.location ? `, ${topic.location}` : ''}`}</Markdown>
        )
      })}
    </>
  ) : null
}

const SessionsHeader = styled(Text)`
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.font.headers};
  font-size: ${({ theme }) => `${theme.fontSize.xl}px`};
  margin-top: ${({ theme }) => `${theme.spacing.l}px`};
  margin-bottom: ${({ theme }) => `${theme.spacing.s}px`};
`

export default SpeakerSessions
