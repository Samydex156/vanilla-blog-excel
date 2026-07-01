Attribute VB_Name = "gemini_prompt"
Function GEMINI_PROMPT2(rangoDatos As Range, promptUsuario As String) As String
    Dim http As Object
    Dim url As String
    Dim apiKey As String
    Dim jsonPayload As String
    Dim response As String
    
    ' CONFIGURACIÓN
    apiKey = "AIzaSyAUXd_sA5iC8CnORecr1mw43IvIgra6JRY"
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=" & apiKey
    
    ' 1. CONVERTIR EL RANGO DE EXCEL A TEXTO ESTRUCTURADO (CSV)
    Dim tablaTexto As String
    Dim fila As Long, columna As Long
    Dim numFilas As Long, numColumnas As Long
    
    numFilas = rangoDatos.Rows.Count
    numColumnas = rangoDatos.Columns.Count
    tablaTexto = ""
    
    For fila = 1 To numFilas
        For columna = 1 To numColumnas
            Dim valorCelda As String
            ' Protegemos el CSV interno
            valorCelda = Replace(rangoDatos.Cells(fila, columna).Value, """", "''")
            tablaTexto = tablaTexto & valorCelda
            If columna < numColumnas Then
                tablaTexto = tablaTexto & ","
            End If
        Next columna
        tablaTexto = tablaTexto & "\n"
    Next fila
    
    ' 2. UNIR LAS INSTRUCCIONES DEL USUARIO CON LOS DATOS
    Dim promptFinal As String
    promptFinal = promptUsuario & "\n\nDatos en formato CSV:\n" & tablaTexto
    
    ' 3. ESCAPAR EL TEXTO PARA QUE EL JSON NO FALLE
    promptFinal = Replace(promptFinal, vbCrLf, " ")
    promptFinal = Replace(promptFinal, vbLf, " ")
    ' CRÍTICO: Aseguramos que si tu prompt tiene comillas, se escapen correctamente
    promptFinal = Replace(promptFinal, """", "\""")
    
    jsonPayload = "{""contents"": [{""parts"":[{""text"": """ & promptFinal & """}]}]}"
    
    ' 4. ENVIAR PETICIÓN HTTP
    Set http = CreateObject("WinHttp.WinHttpRequest.5.1")
    
    On Error GoTo ErrorHandler
    
    ' Subimos un poco el tiempo de espera (25 seg) por si el análisis es profundo
    http.SetTimeouts 5000, 5000, 5000, 25000
    http.Open "POST", url, False
    http.setRequestHeader "Content-Type", "application/json"
    http.send jsonPayload
    
    response = http.responseText
    
    ' 5. EXTRACCIÓN INFALIBLE DEL JSON (Truco del reemplazo)
    Dim inicioTexto As Long
    Dim busquedaToken As String
    Dim rawText As String
    Dim posFin As Long
    
    busquedaToken = """text"": """
    inicioTexto = InStr(response, busquedaToken)
    
    If inicioTexto > 0 Then
        inicioTexto = inicioTexto + Len(busquedaToken)
        ' Tomamos todo el texto desde donde empieza la respuesta de la IA
        rawText = Mid(response, inicioTexto)
        
        ' TRUCO MAGICO: Convertimos las comillas escapadas de la IA ( \") en un comodín
        rawText = Replace(rawText, "\""", "@@QUOTE@@")
        
        ' Ahora, la PRIMERA comilla normal que encontremos es GARANTIZADO el final del texto
        posFin = InStr(rawText, """")
        
        If posFin > 0 Then
            rawText = Left(rawText, posFin - 1)
        End If
        
        ' Restauramos las comillas originales de la IA
        rawText = Replace(rawText, "@@QUOTE@@", """")
        
        ' Convertimos los códigos JSON a formato nativo de Excel
        rawText = Replace(rawText, "\n", vbCrLf)
        rawText = Replace(rawText, "\t", "    ")
        
        GEMINI_PROMPT2 = Trim(rawText)
    Else
        GEMINI_PROMPT2 = "Error: Estructura de respuesta inesperada."
    End If
    
    Exit Function

ErrorHandler:
    GEMINI_PROMPT2 = "Error: " & Err.Description
End Function
