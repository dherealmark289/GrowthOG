<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
                xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>
          <xsl:if test="sitemap:urlset">XML Sitemap</xsl:if>
          <xsl:if test="sitemap:sitemapindex">XML Sitemap Index</xsl:if>
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #000;
            line-height: 1.5;
            margin: 0;
            padding: 20px;
          }
          
          a {
            color: #000;
            text-decoration: underline;
          }
          
          a:hover {
            color: #333;
          }
          
          h1 {
            font-size: 24px;
            font-weight: bold;
            margin-top: 0;
          }
          
          .intro {
            margin-bottom: 20px;
          }
          
          .back-link {
            margin-bottom: 20px;
            display: inline-block;
          }
          
          table {
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
          }
          
          th {
            background-color: #000;
            color: #fff;
            text-align: left;
            padding: 10px;
            font-weight: normal;
          }
          
          td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
          }
          
          tr:nth-child(odd) td {
            background-color: #f8f8f8;
          }
          
          tr:hover td {
            background-color: #efefef;
          }
          
          .count {
            margin-bottom: 20px;
          }
          
          .images, .lastmod {
            text-align: center;
          }
          
          @media (max-width: 767px) {
            .priority, .changefreq {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <xsl:choose>
          <xsl:when test="sitemap:sitemapindex">
            <h1>XML Sitemap Index</h1>
            <p class="intro">This XML Sitemap Index file contains <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/> sitemaps.</p>
            <table>
              <thead>
                <tr>
                  <th>Sitemap</th>
                  <th>Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                  <tr>
                    <td>
                      <a href="{sitemap:loc}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td class="lastmod">
                      <xsl:value-of select="sitemap:lastmod"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </xsl:when>
          <xsl:otherwise>
            <h1>XML Sitemap</h1>
            <p class="intro">This XML Sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs.</p>
            <p class="back-link">← <a href="/sitemap_index.xml">Sitemap Index</a></p>
            <table>
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Images</th>
                  <th>Last Mod.</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <a href="{sitemap:loc}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td class="images">
                      <xsl:value-of select="count(image:image)"/>
                    </td>
                    <td class="lastmod">
                      <xsl:value-of select="substring(sitemap:lastmod, 0, 11)"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </xsl:otherwise>
        </xsl:choose>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>