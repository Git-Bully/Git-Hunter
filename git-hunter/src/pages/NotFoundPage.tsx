import { Link } from 'react-router-dom'
import { EmptyState } from '../components/common/EmptyState'
import { PageContainer } from '../components/layout/PageContainer'
import { Button } from '../components/ui/Button'

export function NotFoundPage() {
  return (
    <PageContainer>
      <EmptyState
        action={
          <Link to="/">
            <Button>홈으로 이동</Button>
          </Link>
        }
        message="요청한 경로는 스프린트 1 프론트엔드 MVP에 포함되어 있지 않습니다."
        title="페이지를 찾을 수 없습니다"
      />
    </PageContainer>
  )
}
