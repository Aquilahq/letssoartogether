<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title><xsl:value-of select="discoveryJourney/metadata/title"/></title>
        <style>
          :root { color-scheme: light; font-family: Arial, sans-serif; background: #f7f4ef; color: #17202a; }
          body { max-width: 900px; margin: 0 auto; padding: 32px 20px 64px; }
          header { border-bottom: 4px solid #173f7a; padding: 24px 0 20px; margin-bottom: 28px; }
          h1 { font-size: 2.4rem; margin: 0 0 8px; color: #173f7a; }
          h2 { font-size: 1.25rem; color: #173f7a; margin: 30px 0 12px; }
          h3 { font-size: .78rem; letter-spacing: .09em; text-transform: uppercase; color: #9a714f; margin: 0 0 7px; }
          p, li { line-height: 1.6; white-space: pre-wrap; }
          .meta { color: #64748b; font-size: .9rem; }
          .card { background: white; border: 1px solid #e5ddd2; border-radius: 12px; padding: 16px 18px; margin: 12px 0; box-shadow: 0 3px 12px #17202a0d; }
          .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; }
          ul { padding-left: 22px; } footer { margin-top: 36px; padding-top: 18px; border-top: 2px solid #d9a98c; color: #173f7a; font-weight: bold; }
          @media print { body { padding: 0; } .card { break-inside: avoid; box-shadow: none; } }
        </style>
      </head>
      <body>
        <header>
          <h1>Let's Soar Together</h1>
          <div class="meta">Discovery Journey · <xsl:value-of select="discoveryJourney/metadata/savedAt"/></div>
          <div class="meta"><xsl:value-of select="discoveryJourney/metadata/website"/> · <xsl:value-of select="discoveryJourney/metadata/contact"/></div>
        </header>
        <h2>Your answers</h2>
        <xsl:for-each select="discoveryJourney/answers/*[not(self::perspectiveAnswers)]">
          <div class="card"><h3><xsl:value-of select="local-name()"/></h3><p><xsl:value-of select="."/></p></div>
        </xsl:for-each>
        <xsl:if test="discoveryJourney/answers/perspectiveAnswers/perspective">
          <h2>Different perspectives</h2>
          <div class="grid"><xsl:for-each select="discoveryJourney/answers/perspectiveAnswers/perspective"><div class="card"><h3><xsl:value-of select="@name"/></h3><p><xsl:value-of select="."/></p></div></xsl:for-each></div>
        </xsl:if>
        <h2>Ideas and choices</h2>
        <div class="grid"><div class="card"><h3>Paths</h3><ul><xsl:for-each select="discoveryJourney/paths/item"><li><xsl:value-of select="."/></li></xsl:for-each></ul></div><div class="card"><h3>Thinking styles</h3><ul><xsl:for-each select="discoveryJourney/thinkingStyles/item"><li><xsl:value-of select="."/></li></xsl:for-each></ul></div></div>
        <xsl:if test="discoveryJourney/ideas/idea"><h2>Idea wall</h2><div class="grid"><xsl:for-each select="discoveryJourney/ideas/idea"><div class="card"><h3><xsl:value-of select="title"/></h3><p><xsl:value-of select="text"/></p></div></xsl:for-each></div></xsl:if>
        <footer>Ready for the next step? · hello@letssoartogether.com · letssoartogether.com</footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
