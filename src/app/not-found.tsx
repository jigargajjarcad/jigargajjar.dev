import { Container } from '@/components/primitives/Container';
import { Link } from '@/components/primitives/Link';
import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';

/**
 * `/404` — implemented from `docs/wireframes/08-404.md`, which is the contract.
 * Specified by `INTERACTION.md` §8 and `ARCHITECTURE.md` §4.
 *
 * A real page with the site's full layout, not a bare message. The reader is
 * mildly annoyed and wants the exit — so no humour, no illustration, no "lost
 * in space" (`EXPERIENCE_PRINCIPLES.md` §3 refuses charm as a substitute for
 * usefulness).
 *
 * The explanation names the two real causes and rules out a third: the most
 * common reader assumption on a 404 is that the content was removed, and on
 * this site permanent URLs (§4) mean it was not.
 *
 * Two exits, not four. `/` for anyone, `/work` for the reader who was probably
 * after a case study. Offering every route as well would be a sitemap, which is
 * what a reader who already knows what they want does not need.
 *
 * Nothing here animates: the whole page is the reader's first viewport
 * (`MOTION.md` §5).
 */
export default function NotFound() {
  return (
    <Container width="wide">
      <Stack gap={8}>
        <Stack gap={6}>
          <Text token="heading-1" as="h1">
            That page does not exist
          </Text>
          <Text token="body">
            The address may be mistyped, or the link that brought you here may have been wrong.
            Nothing here has moved — URLs on this site are permanent.
          </Text>
        </Stack>
        <Stack gap={2}>
          <Link href="/">Home</Link>
          <Link href="/work">All case studies</Link>
        </Stack>
      </Stack>
    </Container>
  );
}
