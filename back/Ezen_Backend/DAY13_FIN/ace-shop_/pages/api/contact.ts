// pages/api/contact.ts
/**
 * // 클라이언트 예: React 컴포넌트 내에서 호출
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: '홍길동', message: '문의합니다.' }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
 */
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: '이름과 메시지를 모두 입력하세요.' });
    }

    // DB 저장 로직 또는 이메일 전송 등을 넣을 수 있음
    return res.status(200).json({ success: true, name, message });
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
