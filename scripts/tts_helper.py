"""
Robust UTF-8 helper for generating high-quality Neural TTS audio using edge-tts.
Compatible with Windows, Linux, and macOS.
Reads text from UTF-8 stdin or --text argument to prevent any character corruption.
"""
import sys
import argparse
import asyncio
import edge_tts

async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--voice', default='az-AZ-BanuNeural')
    parser.add_argument('--rate', default='-4%')
    parser.add_argument('--output', required=True)
    parser.add_argument('--text', default=None)
    args = parser.parse_args()

    if args.text:
        text = args.text
    else:
        text = sys.stdin.buffer.read().decode('utf-8')

    text = text.strip()
    if not text:
        sys.exit(1)

    communicate = edge_tts.Communicate(text, args.voice, rate=args.rate)
    await communicate.save(args.output)

if __name__ == '__main__':
    asyncio.run(main())
